import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  fetchPlaceWithUnsplash,
  fetchHotelWithUnsplash,
} from "./unsplashApi.js";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const MODELS_TO_TRY = [
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-pro"
];

export async function fetchItinerary({
  location,
  totalDays,
  Traveller,
  budget,
}) {
  const prompt = `
You are a travel planner AI. Generate a travel plan in **valid JSON format** only. 
No Markdown, no code blocks, no extra text. Follow this structure:

{
  "hotels": [
    {
      "HotelName": "",
      "Address": "",
      "Price": "",
      "ImageUrl": "",
      "GeoCoordinates": "",
      "Rating": "",
      "Description": ""
    }
  ],
  "itinerary": [
    {
      "Day": 1,
      "Activities": [
        {
          "PlaceName": "",
          "PlaceDetails": "",
          "ImageUrl": "",
          "GeoCoordinates": "",
          "TicketPricing": "",
          "Rating": "",
          "BestTimeToVisit": "",
          "TravelTime": ""
        }
      ]
    }
  ]
}

Now generate a plan for:
Location: ${location}
Total Days: ${totalDays}
Traveller(s): ${Traveller}
Budget: ${budget}
`;

  let result = null;
  let lastError = null;

  for (const modelName of MODELS_TO_TRY) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      result = await model.generateContent(prompt);
      break;
    } catch (error) {
      lastError = error;
      continue;
    }
  }

  if (!result) {
    if (lastError?.message?.includes('404') || lastError?.message?.includes('not found')) {
      throw new Error('Gemini API models not available. Please check your API key.');
    }
    throw new Error(`Failed to generate itinerary. Please try again. Error: ${lastError?.message || 'Unknown error'}`);
  }

  try {
    const text = result.response.text().trim();
    const cleanText = text
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    const parsed = JSON.parse(cleanText);

    if (parsed.hotels && Array.isArray(parsed.hotels)) {
      const hotelPromises = parsed.hotels.map(async (hotel) => {
        const hotelDetails = await fetchHotelWithUnsplash(
          hotel.HotelName,
          location
        );
        return {
          ...hotel,
          ImageUrl: hotelDetails.ImageUrl || hotel.ImageUrl,
          GeoCoordinates: hotelDetails.GeoCoordinates || hotel.GeoCoordinates,
          Rating: hotelDetails.Rating || hotel.Rating,
          Address: hotelDetails.Address || hotel.Address,
        };
      });
      parsed.hotels = await Promise.all(hotelPromises);
    }

    if (parsed.itinerary && Array.isArray(parsed.itinerary)) {
      const itineraryPromises = parsed.itinerary.map(async (day) => {
        if (day.Activities && Array.isArray(day.Activities)) {
          const activityPromises = day.Activities.map(async (activity) => {
            const placeDetails = await fetchPlaceWithUnsplash(
              activity.PlaceName,
              location
            );
            return {
              ...activity,
              ImageUrl: placeDetails.ImageUrl || activity.ImageUrl,
              GeoCoordinates:
                placeDetails.GeoCoordinates || activity.GeoCoordinates,
              Rating: placeDetails.Rating || activity.Rating,
              PlaceDetails: placeDetails.PlaceDetails || activity.PlaceDetails,
            };
          });
          day.Activities = await Promise.all(activityPromises);
        }
        return day;
      });
      parsed.itinerary = await Promise.all(itineraryPromises);
    }

    return parsed;
  } catch (err) {
    return null;
  }
}

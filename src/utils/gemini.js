import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  fetchPlaceImage,
  fetchHotelImage,
} from "./imageApi.js";

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

IMPORTANT: 
- Provide at least 3-5 hotel recommendations with different price ranges
- Each hotel must have complete details including name, address, price, rating, and description
- Hotels should match the ${budget} budget category

Now generate a plan for:
Location: ${location}
Total Days: ${totalDays}
Traveller(s): ${Traveller}
Budget: ${budget}
`;

  let result = null;
  let lastError = null;

  // trying to call all models at same time so it is faster
  // if one works we use that one
  try {
    const allPromises = MODELS_TO_TRY.map(async (name) => {
      console.log("calling model " + name);
      const model = genAI.getGenerativeModel({ model: name });
      const res = await model.generateContent(prompt);
      return res;
    });

    result = await Promise.any(allPromises);
    console.log("one model worked!");

  } catch (err) {
    console.log("everything failed");
    console.log(err);
    lastError = err;
  }

  if (!result) {
    if (lastError?.message?.includes('404') || lastError?.message?.includes('not found')) {
      throw new Error('Gemini API models not available. Please check your API key.');
    }
    // simple error message
    throw new Error(`Failed to generate itinerary. Please try again.`);
  }

  try {
    const text = result.response.text().trim();
    // cleaning the text
    const cleanText = text
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    const parsed = JSON.parse(cleanText);

    // getting images for hotels
    if (parsed.hotels && Array.isArray(parsed.hotels)) {
      const hotelPromises = parsed.hotels.map(async (hotel, index) => {
        // fetching image
        const hotelDetails = await fetchHotelImage(
          hotel.HotelName,
          location,
          index
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

    // getting images for itinerary
    if (parsed.itinerary && Array.isArray(parsed.itinerary)) {
      const itineraryPromises = parsed.itinerary.map(async (day) => {
        if (day.Activities && Array.isArray(day.Activities)) {
          const activityPromises = day.Activities.map(async (activity) => {
            const placeDetails = await fetchPlaceImage(
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
    console.log("parsing error", err);
    return null;
  }
}

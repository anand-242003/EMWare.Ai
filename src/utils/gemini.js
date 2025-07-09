import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  fetchPlaceWithUnsplash,
  fetchHotelWithUnsplash,
} from "./unsplashApi.js";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function fetchItinerary({
  location,
  totalDays,
  Traveller,
  budget,
}) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Optional: Remove code blocks if present (backup safeguard)
    const cleanText = text
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    const parsed = JSON.parse(cleanText);

    // Fetch real images and details for hotels using Unsplash API
    if (parsed.hotels && Array.isArray(parsed.hotels)) {
      console.log("🏨 Fetching hotel images from Unsplash...");
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

    // Fetch real images and details for places using Unsplash API
    if (parsed.itinerary && Array.isArray(parsed.itinerary)) {
      console.log("📍 Fetching place images from Unsplash...");
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

    console.log("✅ Successfully fetched itinerary with Unsplash images!");
    return parsed;
  } catch (err) {
    console.error("❌ Gemini Itinerary JSON Parse Error:", err);
    return null;
  }
}

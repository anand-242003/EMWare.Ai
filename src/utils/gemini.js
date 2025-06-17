import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function fetchItinerary({ location, totalDays, Traveller, budget }) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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
    return parsed;
  } catch (err) {
    console.error("❌ Gemini Itinerary JSON Parse Error:", err);
    return null;
  }
}

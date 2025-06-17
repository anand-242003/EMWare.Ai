// ../../utils/gemini.js
const AI_PROMPT = `
Generate a detailed travel itinerary for:
Location: {location},
Duration: {totalDays} days,
Travelling with: {Traveller},
Budget: {budget}.

Also include a specific "bestTimeToVisit" value for the overall destination, considering local climate and tourism seasons.

Return the response as a JSON object (without additional text or markdown) in the following format:
{
  "location": "{location}",
  "days": {totalDays},
  "bestTimeToVisit": "April to June",  // This must be based on the actual destination.
  "hotels": [
    {
      "HotelName": "Le Meurice",
      "Address": "228 Rue de Rivoli, Paris",
      "ImageUrl": "https://link-to-image.com/hotel1.jpg",
      "Price": "3200",
      "Rating": 4.8,
      "Description": "Luxury 5-star hotel in the heart of Paris."
    }
  ],
  "itinerary": [
    {
      "Day": 1,
      "Activities": [
        {
          "PlaceName": "Eiffel Tower",
          "PlaceDetails": "Iconic symbol of Paris",
          "ImageUrl": "https://link-to-image.com/eiffel.jpg",
          "TicketPricing": "25",
          "Rating": 4.7,
          "BestTimeToVisit": "Morning",
          "TravelTime": "2 hours"
        }
      ]
    }
  ]
}
`;


export const fetchItinerary = async ({ location, totalDays, Traveller, budget }) => {
  console.log("fetchItinerary called with:", { location, totalDays, Traveller, budget });
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  console.log("Gemini API Key:", API_KEY ? "Set" : "Not set");

  if (!API_KEY) {
    throw new Error("Gemini API Key is not set in the environment variables.");
  }

  const model = "gemini-1.5-flash";
  const apiVersion = "v1";
  const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent`;

  const formattedPrompt = AI_PROMPT.replace("{location}", location)
    .replace("{totalDays}", totalDays)
    .replace("{Traveller}", Traveller)
    .replace("{budget}", budget);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: formattedPrompt,
              },
            ],
          },
        ],
      }),
    });

    console.log("Gemini API Response Status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log("Gemini API Raw Response:", JSON.stringify(data, null, 2));

    if (!data || !data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error("Invalid response format from Gemini API");
    }

    const responseText = data.candidates[0].content.parts[0].text;
    console.log("Gemini API Response Text:", responseText);

    let itineraryData;
    try {
      const jsonMatch = responseText.match(/{[\s\S]*}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in the response");
      }
      const jsonString = jsonMatch[0];
      console.log("Extracted JSON String:", jsonString);
      itineraryData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", parseError);
      throw new Error("Failed to parse itinerary data from Gemini API response");
    }

    console.log("Parsed Itinerary Data:", JSON.stringify(itineraryData, null, 2));

    if (!itineraryData || !itineraryData.hotels || !itineraryData.itinerary) {
      throw new Error("Invalid itinerary data: missing required fields");
    }

    // Add missing top-level fields if not present
    itineraryData.location = itineraryData.location || location;
    itineraryData.days = itineraryData.days || parseInt(totalDays, 10);
    itineraryData.bestTimeToVisit = itineraryData.bestTimeToVisit || "Not specified";

    console.log("Final Itinerary Data:", JSON.stringify(itineraryData, null, 2));
    return itineraryData;
  } catch (error) {
    console.error("❌ Gemini Itinerary Error:", error);
    throw error;
  }
};
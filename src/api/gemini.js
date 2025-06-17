import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function fetchItinerary({ location, totalDays, Traveller, budget }) {
  const prompt = `Generate a travel plan for Location: ${location}, for ${totalDays} days, for ${Traveller}, with a ${budget} budget. Provide a list of hotel options including HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, and descriptions. Also, suggest an itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, and time to travel for each location, with a day-by-day plan for ${totalDays} days, including the best time to visit. Return the response as a valid JSON object only, without any additional text, Markdown, code blocks, or backticks.`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = result.response.text();

  try {
    const json = JSON.parse(response);
    return json;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    return null;
  }
}

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

/**
 * Fetch image from Unsplash based on search query
 * @param {string} query - Search query for the image
 * @returns {Promise<string>} Image URL from Unsplash
 */
export async function fetchUnsplashImage(query) {
  try {
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.warn(`No image found for query: ${query}`);
      return "";
    }

    // Return the regular sized image URL
    return data.results[0].urls.regular;
  } catch (error) {
    console.error(`Error fetching image for ${query}:`, error);
    return "";
  }
}

/**
 * Fetch place details with Unsplash image
 * @param {string} placeName - Name of the place
 * @param {string} location - Location context
 * @returns {Promise<Object>} Place details with Unsplash image
 */
export async function fetchPlaceWithUnsplash(placeName, location) {
  try {
    // Create search query for better image results
    const imageQuery = `${placeName} ${location} landmark tourist attraction`;
    const imageUrl = await fetchUnsplashImage(imageQuery);

    return {
      ImageUrl: imageUrl,
      GeoCoordinates: "", // You can still use Google Places API for coordinates if needed
      Rating: "",
      PlaceDetails: placeName,
    };
  } catch (error) {
    console.error(
      `Error fetching place with Unsplash for ${placeName}:`,
      error
    );
    return {
      ImageUrl: "",
      GeoCoordinates: "",
      Rating: "",
      PlaceDetails: placeName,
    };
  }
}

/**
 * Fetch hotel details with Unsplash image
 * @param {string} hotelName - Name of the hotel
 * @param {string} location - Location context
 * @returns {Promise<Object>} Hotel details with Unsplash image
 */
export async function fetchHotelWithUnsplash(hotelName, location) {
  try {
    // Create search query for better hotel image results
    const imageQuery = `${hotelName} ${location} hotel luxury accommodation`;
    const imageUrl = await fetchUnsplashImage(imageQuery);

    return {
      ImageUrl: imageUrl,
      GeoCoordinates: "", // You can still use Google Places API for coordinates if needed
      Rating: "",
      Address: hotelName,
    };
  } catch (error) {
    console.error(
      `Error fetching hotel with Unsplash for ${hotelName}:`,
      error
    );
    return {
      ImageUrl: "",
      GeoCoordinates: "",
      Rating: "",
      Address: hotelName,
    };
  }
}

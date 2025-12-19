const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function fetchUnsplashImage(query) {
  try {
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return "";
    }

    return data.results[0].urls.regular;
  } catch (error) {
    return "";
  }
}

export async function fetchPlaceWithUnsplash(placeName, location) {
  try {
    const imageQuery = `${placeName} ${location} landmark tourist attraction`;
    const imageUrl = await fetchUnsplashImage(imageQuery);

    return {
      ImageUrl: imageUrl,
      GeoCoordinates: "",
      Rating: "",
      PlaceDetails: placeName,
    };
  } catch (error) {
    return {
      ImageUrl: "",
      GeoCoordinates: "",
      Rating: "",
      PlaceDetails: placeName,
    };
  }
}

export async function fetchHotelWithUnsplash(hotelName, location) {
  try {
    const imageQuery = `${hotelName} ${location} hotel luxury accommodation`;
    const imageUrl = await fetchUnsplashImage(imageQuery);

    return {
      ImageUrl: imageUrl,
      GeoCoordinates: "",
      Rating: "",
      Address: hotelName,
    };
  } catch (error) {
    return {
      ImageUrl: "",
      GeoCoordinates: "",
      Rating: "",
      Address: hotelName,
    };
  }
}

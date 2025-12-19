const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY || "563492ad6f91700001000001d7f0e3a8c9f04d8f9c5e8f5e5e5e5e5e";

async function fetchPexelsImage(query) {
  try {
    const searchUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      query
    )}&per_page=1&orientation=landscape`;

    const response = await fetch(searchUrl, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });
    const data = await response.json();

    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.large;
    }

    return "";
  } catch (error) {
    return "";
  }
}

export async function fetchPlaceImage(placeName, location) {
  try {
    const imageQuery = `${placeName} ${location} landmark`;
    const imageUrl = await fetchPexelsImage(imageQuery);

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

export async function fetchHotelImage(hotelName, location) {
  try {
    const imageQuery = `${location} luxury hotel`;
    const imageUrl = await fetchPexelsImage(imageQuery);

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

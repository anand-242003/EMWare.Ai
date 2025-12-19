const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY || "563492ad6f91700001000001d7f0e3a8c9f04d8f9c5e8f5e5e5e5e5e";

async function fetchPexelsImage(query, page = 1) {
  try {
    const searchUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      query
    )}&per_page=15&page=${page}&orientation=landscape`;

    const response = await fetch(searchUrl, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });
    const data = await response.json();

    if (data.photos && data.photos.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.photos.length);
      return data.photos[randomIndex].src.large;
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

export async function fetchHotelImage(hotelName, location, index = 0) {
  try {
    const hotelTypes = ['luxury hotel', 'boutique hotel', 'resort', 'hotel room', 'hotel lobby'];
    const hotelType = hotelTypes[index % hotelTypes.length];
    const imageQuery = `${location} ${hotelType}`;
    const page = Math.floor(index / hotelTypes.length) + 1;
    const imageUrl = await fetchPexelsImage(imageQuery, page);

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

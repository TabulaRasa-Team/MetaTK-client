import * as Location from 'expo-location';

export type Coordinates = { latitude: number; longitude: number };

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export async function geocodeAddress(query: string): Promise<Coordinates | undefined> {
  if (!query?.trim()) return undefined;

  // Google Maps Geocoding API 사용
  if (GOOGLE_MAPS_API_KEY) {
    try {
      const address = encodeURIComponent(query.trim());
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API_KEY}&region=kr&language=ko`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK' && data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        console.log(`✅ Geocoded: ${query} -> (${location.lat}, ${location.lng})`);
        return {
          latitude: location.lat,
          longitude: location.lng,
        };
      } else {
        console.warn(`❌ Failed to geocode: ${query}, Status: ${data.status}`);
      }
    } catch (error) {
      console.error('Google Geocoding API 에러:', error);
    }
  }

  // Fallback: expo-location 사용
  try {
    const results = await Location.geocodeAsync(query.trim());
    if (results && results.length > 0) {
      const { latitude, longitude } = results[0];
      console.log(`✅ Geocoded (fallback): ${query} -> (${latitude}, ${longitude})`);
      return { latitude, longitude };
    }
  } catch (error) {
    console.error('Expo Location 에러:', error);
  }

  console.warn(`⚠️ Failed to geocode address: ${query}`);
  return undefined;
}



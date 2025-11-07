import * as Location from 'expo-location';

export type Coordinates = { latitude: number; longitude: number };

export async function geocodeAddress(query: string): Promise<Coordinates | undefined> {
  if (!query?.trim()) return undefined;
  try {
    const results = await Location.geocodeAsync(query.trim());
    if (results && results.length > 0) {
      const { latitude, longitude } = results[0];
      return { latitude, longitude };
    }
  } catch {
    // ignore
  }
  return undefined;
}



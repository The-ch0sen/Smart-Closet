import type { WeatherSnapshot } from "../types/wardrobe";

const MOCK_WEATHER: WeatherSnapshot = {
  temperatureC: 23,
  condition: "sunny",
  humidity: 48,
  fetchedAt: new Date().toISOString(),
};

export const WeatherService = {
  async getCurrent(): Promise<WeatherSnapshot> {
    // Mocked response for now; replace with real API integration when ready.
    return Promise.resolve({
      ...MOCK_WEATHER,
      fetchedAt: new Date().toISOString(),
    });
  },
};

export type ClothingCategory =
  | "top"
  | "bottom"
  | "outerwear"
  | "footwear"
  | "accessory";

export type Season = "spring" | "summer" | "autumn" | "winter" | "all";

export interface WardrobeItemInput {
  name: string;
  category: ClothingCategory;
  color: string;
  seasons: Season[];
  tags?: string[];
  imageUri?: string;
}

export interface WardrobeItem extends WardrobeItemInput {
  id: string;
  createdAt: string;
  usageCount: number;
}

export interface WardrobeFilter {
  category?: ClothingCategory;
  query?: string;
}

export type WeatherCondition = "sunny" | "cloudy" | "rainy" | "snowy" | "windy";

export interface WeatherSnapshot {
  temperatureC: number;
  condition: WeatherCondition;
  humidity: number;
  fetchedAt: string;
}

export interface OutfitRecommendation {
  items: WardrobeItem[];
  rationale: string;
  weather: WeatherSnapshot;
}

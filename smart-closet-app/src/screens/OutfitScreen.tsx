import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { EmptyState } from "../components/EmptyState";
import { WardrobeItemCard } from "../components/WardrobeItemCard";
import { WardrobeService } from "../services/wardrobe";
import { WeatherService } from "../services/weather";
import type {
  ClothingCategory,
  WardrobeItem,
  WeatherSnapshot,
} from "../types/wardrobe";
import { colors, radius, spacing, typography } from "../theme";

const CORE_CATEGORIES: ClothingCategory[] = [
  "top",
  "bottom",
  "footwear",
  "outerwear",
];

const CONDITION_SEASON_MAP: Record<WeatherSnapshot["condition"], Array<"winter" | "summer" | "spring" | "autumn" | "all">> = {
  sunny: ["summer", "spring", "all"],
  cloudy: ["spring", "autumn", "all"],
  rainy: ["autumn", "spring", "all"],
  snowy: ["winter", "autumn"],
  windy: ["autumn", "spring", "all"],
};

const temperatureToSeasons = (temperature: number): Array<"winter" | "summer" | "spring" | "autumn" | "all"> => {
  if (temperature <= 8) {
    return ["winter"];
  }
  if (temperature >= 26) {
    return ["summer", "spring", "all"];
  }
  if (temperature >= 18) {
    return ["spring", "autumn", "all"];
  }
  return ["autumn", "spring", "all"];
};

const pickItemsForWeather = (
  items: WardrobeItem[],
  weather: WeatherSnapshot
): WardrobeItem[] => {
  const byCategory = new Map<ClothingCategory, WardrobeItem[]>();
  items.forEach((item) => {
    const current = byCategory.get(item.category) ?? [];
    current.push(item);
    byCategory.set(item.category, current);
  });

  const preferredSeasons = Array.from(
    new Set([
      ...CONDITION_SEASON_MAP[weather.condition],
      ...temperatureToSeasons(weather.temperatureC),
      "all",
    ])
  );

  const pickForCategory = (category: ClothingCategory) => {
    const candidates = byCategory.get(category) ?? [];
    const sorted = [...candidates].sort((a, b) => a.usageCount - b.usageCount);
    return (
      sorted.find((item) =>
        item.seasons.some((season) => preferredSeasons.includes(season))
      ) ?? sorted[0]
    );
  };

  const selection: WardrobeItem[] = [];
  CORE_CATEGORIES.forEach((category) => {
    const pick = pickForCategory(category);
    if (pick) {
      selection.push(pick);
    }
  });

  const accessory = pickForCategory("accessory");
  if (accessory) {
    selection.push(accessory);
  }

  return selection;
};

export const OutfitScreen: React.FC = () => {
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const [weatherData, items] = await Promise.all([
      WeatherService.getCurrent(),
      WardrobeService.getAll(),
    ]);
    setWeather(weatherData);
    setWardrobeItems(items);
    setIsLoading(false);
  }, []);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  }, [loadData]);

  useFocusEffect(
    useCallback(() => {
      void loadData();
    }, [loadData])
  );

  const recommendation = useMemo(() => {
    if (!weather || !wardrobeItems.length) {
      return [];
    }
    return pickItemsForWeather(wardrobeItems, weather);
  }, [wardrobeItems, weather]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Collecting outfit ideas...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
        contentContainerStyle={styles.content}
      >
        {weather ? (
          <View style={styles.weatherCard}>
            <Text style={styles.sectionTitle}>Today's weather</Text>
            <Text style={styles.weatherPrimary}>
              {weather.condition.toUpperCase()} · {weather.temperatureC}°C
            </Text>
            <Text style={styles.weatherSecondary}>Humidity {weather.humidity}%</Text>
          </View>
        ) : null}

        <Text style={[styles.sectionTitle, styles.sectionSpacing]}>Recommended outfit</Text>
        {recommendation.length ? (
          recommendation.map((item) => (
            <WardrobeItemCard key={item.id} item={item} />
          ))
        ) : (
          <EmptyState
            title="Need more wardrobe items"
            description="Add a few more pieces to get tailored outfit suggestions."
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  centered: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  loadingText: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
  weatherCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginBottom: spacing.xl,
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.subheading,
    color: colors.text,
  },
  sectionSpacing: {
    marginBottom: spacing.md,
  },
  weatherPrimary: {
    ...typography.heading,
    color: colors.primary,
    marginTop: spacing.sm,
  },
  weatherSecondary: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});


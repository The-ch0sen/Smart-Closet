import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import SectionTitle from '../components/SectionTitle';
import FeatureCard from '../components/FeatureCard';
import ActionButton from '../components/ActionButton';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import useDailyOutfit from '../hooks/useDailyOutfit';
import { featureHighlights, quickActions, recommendationSlots } from '../constants/features';
import { fetchWeatherSummary } from '../services/weatherService';
import { fetchClosetOverview } from '../services/closetService';

const HomeScreen = () => {
  const { outfit, isLoading: isOutfitLoading } = useDailyOutfit();
  const [weather, setWeather] = useState();
  const [closetOverview, setClosetOverview] = useState();

  useEffect(() => {
    fetchWeatherSummary().then(setWeather);
    fetchClosetOverview().then(setClosetOverview);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Smart Closet" subtitle="智慧穿搭助手" />

      <View style={styles.section}>
        <SectionTitle label="快速操作" />
        <View style={styles.row}>
          {quickActions.map((action) => (
            <ActionButton key={action.id} label={action.label} onPress={() => {}} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle label="今日洞察" />
        <View style={styles.insightCard}>
          <View style={styles.insightRow}>
            <Text style={styles.insightLabel}>天氣</Text>
            <Text style={styles.insightValue}>
              {weather
                ? `${weather.location} · ${weather.temperature}°C · ${weather.condition}`
                : '載入中...'}
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.insightRow}>
            <Text style={styles.insightLabel}>衣櫃統計</Text>
            <Text style={styles.insightValue}>
              {closetOverview
                ? `${closetOverview.totalItems} 件單品 · ${closetOverview.categories[0].label} ${closetOverview.categories[0].count} 件`
                : '建立資料中...'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle label="AI 穿搭推薦" action="查看全部" />
        <View style={styles.recommendationCard}>
          {isOutfitLoading ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <>
              <Text style={styles.outfitTitle}>{outfit.title}</Text>
              <Text style={styles.outfitDescription}>{outfit.description}</Text>
              <View style={styles.outfitList}>
                {outfit.items.map((item) => (
                  <View key={item.category} style={styles.outfitItem}>
                    <Text style={styles.outfitCategory}>{item.category}</Text>
                    <Text style={styles.outfitName}>{item.name}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        <View style={styles.recommendationGrid}>
          {recommendationSlots.map((slot) => (
            <View key={slot.id} style={styles.secondaryCard}>
              <Text style={styles.secondaryTitle}>{slot.title}</Text>
              <Text style={styles.secondaryDescription}>{slot.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle label="功能導覽" action="全部功能" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featureHighlights.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
  },
  insightCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  insightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  insightValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  recommendationCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  outfitTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  outfitDescription: {
    marginTop: spacing.xs,
    fontSize: 14,
    color: colors.textSecondary,
  },
  outfitList: {
    marginTop: spacing.md,
  },
  outfitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  outfitCategory: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  outfitName: {
    color: colors.textPrimary,
    fontWeight: '500',
    fontSize: 14,
  },
  recommendationGrid: {
    gap: spacing.md,
  },
  secondaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  secondaryDescription: {
    marginTop: spacing.xs,
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default HomeScreen;
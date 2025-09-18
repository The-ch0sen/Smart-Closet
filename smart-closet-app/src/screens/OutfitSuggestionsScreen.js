import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import { recommendationSlots } from '../constants/features';

const OutfitSuggestionsScreen = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>AI 穿搭建議</Text>
    <Text style={styles.description}>
      根據場合、天氣與心情生成穿搭，並可收藏或對推薦結果做回饋。
    </Text>

    {recommendationSlots.map((slot) => (
      <View key={slot.id} style={styles.card}>
        <Text style={styles.cardTitle}>{slot.title}</Text>
        <Text style={styles.cardDescription}>{slot.description}</Text>
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  cardDescription: {
    marginTop: spacing.xs,
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default OutfitSuggestionsScreen;
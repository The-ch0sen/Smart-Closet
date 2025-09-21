import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const AnalyticsScreen = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>穿搭數據洞察</Text>
    <Text style={styles.description}>
      追蹤衣物出場率、喜好趨勢與社交互動數據，持續優化個人風格推薦。
    </Text>

    <View style={styles.chartPlaceholder}>
      <Text style={styles.placeholderLabel}>Usage Chart Placeholder</Text>
    </View>

    <View style={styles.metricsRow}>
      {['出場率', '收藏數', '推薦命中率'].map((label) => (
        <View key={label} style={styles.metricCard}>
          <Text style={styles.metricValue}>--%</Text>
          <Text style={styles.metricLabel}>{label}</Text>
        </View>
      ))}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
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
  chartPlaceholder: {
    height: 220,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderLabel: {
    color: colors.textSecondary,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.primary,
  },
  metricLabel: {
    marginTop: spacing.xs,
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default AnalyticsScreen;
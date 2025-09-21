import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const FeatureCard = ({ title, description, icon }) => (
  <View style={styles.card}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginRight: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  icon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  description: {
    marginTop: spacing.xs,
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default FeatureCard;
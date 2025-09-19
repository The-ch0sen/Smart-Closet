import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "../theme";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {description ? <Text style={styles.description}>{description}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  title: {
    ...typography.subheading,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: "center",
  },
});

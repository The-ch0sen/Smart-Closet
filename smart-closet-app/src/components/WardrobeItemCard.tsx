import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { WardrobeItem } from "../types/wardrobe";
import { colors, radius, spacing, typography } from "../theme";

interface WardrobeItemCardProps {
  item: WardrobeItem;
}

export const WardrobeItemCard: React.FC<WardrobeItemCardProps> = ({ item }) => (
  <View style={styles.card}>
    {item.imageUri ? (
      <Image source={{ uri: item.imageUri }} style={styles.image} />
    ) : (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>{item.name.charAt(0).toUpperCase()}</Text>
      </View>
    )}
    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.meta}>{item.category.toUpperCase()} • {item.color}</Text>
      <Text style={styles.meta}>
        Seasons: {item.seasons.length ? item.seasons.join(", ") : "All year"}
      </Text>
      {!!item.tags?.length && (
        <View style={styles.tagRow}>
          {item.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    flexDirection: "row",
    marginBottom: spacing.md,
    overflow: "hidden",
    padding: spacing.md,
  },
  image: {
    borderRadius: radius.md,
    height: 72,
    marginRight: spacing.md,
    width: 72,
  },
  placeholder: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 72,
    justifyContent: "center",
    marginRight: spacing.md,
    width: 72,
  },
  placeholderText: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: "600",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    ...typography.subheading,
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: spacing.xs / 2,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: spacing.xs,
  },
  tag: {
    backgroundColor: colors.background,
    borderRadius: radius.sm,
    marginRight: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
  },
  tagText: {
    color: colors.textMuted,
    fontSize: 12,
  },
});

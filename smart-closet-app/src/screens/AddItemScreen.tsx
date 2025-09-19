import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { WardrobeService } from "../services/wardrobe";
import type { ClothingCategory, Season } from "../types/wardrobe";
import { colors, radius, spacing, typography } from "../theme";

const CATEGORY_OPTIONS: ClothingCategory[] = [
  "top",
  "bottom",
  "outerwear",
  "footwear",
  "accessory",
];

const SEASON_OPTIONS: Season[] = ["spring", "summer", "autumn", "winter", "all"];

const CATEGORY_LABELS: Record<ClothingCategory, string> = {
  top: "Top",
  bottom: "Bottom",
  outerwear: "Outerwear",
  footwear: "Footwear",
  accessory: "Accessory",
};

const SEASON_LABELS: Record<Season, string> = {
  spring: "Spring",
  summer: "Summer",
  autumn: "Autumn",
  winter: "Winter",
  all: "All year",
};

export const AddItemScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ClothingCategory>("top");
  const [color, setColor] = useState("");
  const [selectedSeasons, setSelectedSeasons] = useState<Season[]>(["all"]);
  const [tagsText, setTagsText] = useState("");
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [isSaving, setIsSaving] = useState(false);

  const toggleSeason = (season: Season) => {
    if (season === "all") {
      setSelectedSeasons(["all"]);
      return;
    }

    setSelectedSeasons((prev) => {
      const withoutAll = prev.filter((value) => value !== "all");
      if (withoutAll.includes(season)) {
        const next = withoutAll.filter((value) => value !== season);
        return next.length ? next : ["all"];
      }
      return [...withoutAll, season];
    });
  };

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Media library permission required",
        "Enable photo library access in system settings to attach images."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
      allowsEditing: true,
      aspect: [4, 5],
    });

    if (!result.canceled) {
      setImageUri(result.assets[0]?.uri);
    }
  };

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Camera permission required",
        "Enable camera access in system settings to take photos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: true,
      aspect: [4, 5],
    });

    if (!result.canceled) {
      setImageUri(result.assets[0]?.uri);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !color.trim()) {
      Alert.alert(
        "Missing information",
        "Please fill in the name and color before saving."
      );
      return;
    }

    setIsSaving(true);
    try {
      const seasons = selectedSeasons.length ? selectedSeasons : ["all"];
      const tags = tagsText
        .split(/[,\s]+/)
        .map((tag) => tag.trim())
        .filter(Boolean);

      await WardrobeService.add({
        name: name.trim(),
        category,
        color: color.trim(),
        seasons,
        tags,
        imageUri,
      });

      setName("");
      setColor("");
      setSelectedSeasons(["all"]);
      setTagsText("");
      setImageUri(undefined);

      Alert.alert("Saved", "This item has been added to your wardrobe.");
    } catch (error) {
      Alert.alert("Save failed", "Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Add New Item</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="e.g. White T-shirt"
            placeholderTextColor={colors.textMuted}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.row}>
            {CATEGORY_OPTIONS.map((option) => {
              const isActive = option === category;
              return (
                <Pressable
                  key={option}
                  onPress={() => setCategory(option)}
                  style={[styles.chip, isActive && styles.chipActive]}
                >
                  <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                    {CATEGORY_LABELS[option]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Color</Text>
          <TextInput
            value={color}
            onChangeText={setColor}
            style={styles.input}
            placeholder="e.g. White"
            placeholderTextColor={colors.textMuted}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Seasons</Text>
          <View style={styles.row}>
            {SEASON_OPTIONS.map((season) => {
              const isActive = selectedSeasons.includes(season);
              return (
                <Pressable
                  key={season}
                  onPress={() => toggleSeason(season)}
                  style={[styles.chip, isActive && styles.chipActive]}
                >
                  <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                    {SEASON_LABELS[season]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tags (comma or space separated)</Text>
          <TextInput
            value={tagsText}
            onChangeText={setTagsText}
            style={styles.input}
            placeholder="casual, commute, minimal"
            placeholderTextColor={colors.textMuted}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Photo</Text>
          <View style={styles.row}>
            <Pressable style={styles.button} onPress={handlePickImage}>
              <Text style={styles.buttonText}>Choose from library</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.secondaryButton]}
              onPress={handleTakePhoto}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                Take a photo
              </Text>
            </Pressable>
          </View>
          {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} /> : null}
        </View>
        <Pressable
          onPress={handleSubmit}
          style={[styles.submitButton, isSaving && styles.submitButtonDisabled]}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color={colors.surface} />
          ) : (
            <Text style={styles.submitText}>Save item</Text>
          )}
        </Pressable>
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
  title: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    marginRight: spacing.sm,
    marginVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.text,
    fontSize: 13,
  },
  chipTextActive: {
    color: colors.surface,
    fontWeight: "600",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginRight: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  buttonText: {
    color: colors.surface,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  preview: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 160,
    marginTop: spacing.md,
    width: "100%",
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
});

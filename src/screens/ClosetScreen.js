import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const ClosetScreen = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>虛擬衣櫃</Text>
    <Text style={styles.description}>
      這裡將呈現所有數位化衣物、標籤篩選與搜尋功能，協助用戶快速整理衣櫃。
    </Text>
    <View style={styles.placeholder}>
      <Text style={styles.placeholderLabel}>Closet Grid Placeholder</Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  placeholder: {
    height: 280,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderLabel: {
    color: colors.textSecondary,
  },
});

export default ClosetScreen;
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const ActionButton = ({ label, onPress }) => (
  <Pressable style={styles.button} onPress={onPress}>
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.textPrimary,
  },
});

export default ActionButton;
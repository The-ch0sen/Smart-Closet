import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const SectionTitle = ({ label, action }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    {action ? <Text style={styles.action}>{action}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  action: {
    fontSize: 14,
    color: colors.primary,
  },
});

export default SectionTitle;
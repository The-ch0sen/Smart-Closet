import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const Header = ({ title, subtitle }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default Header;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface ServeIndicatorProps {
  playerName: string;
}

export const ServeIndicator: React.FC<ServeIndicatorProps> = ({ playerName }) => (
  <View style={styles.container}>
    <Text style={styles.text}>🏓 Serving: {playerName}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.full,
    marginTop: theme.spacing.md,
  },
  text: {
    color: theme.colors.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

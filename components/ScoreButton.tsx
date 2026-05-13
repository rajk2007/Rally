import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface ScoreButtonProps {
  score: number;
  teamName: string;
  isServing: boolean;
  onPress: () => void;
}

export const ScoreButton: React.FC<ScoreButtonProps> = ({ score, teamName, isServing, onPress }) => (
  <TouchableOpacity 
    style={[styles.button, isServing && styles.servingButton]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.teamName}>{teamName}</Text>
    <Text style={styles.score}>{score}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  servingButton: {
    backgroundColor: 'rgba(0, 230, 118, 0.05)',
  },
  teamName: {
    color: theme.colors.textMuted,
    fontSize: 16,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  score: {
    color: theme.colors.text,
    fontSize: 80,
    fontWeight: 'bold',
  },
});

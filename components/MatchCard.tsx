import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { format } from 'date-fns';

interface MatchCardProps {
  match: any;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const isWin = match.winner === 'team1';
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.date}>{format(new Date(match.created_at), 'MMM d, yyyy')}</Text>
        <View style={[styles.badge, { backgroundColor: isWin ? theme.colors.success : theme.colors.danger }]}>
          <Text style={styles.badgeText}>{isWin ? 'WIN' : 'LOSS'}</Text>
        </View>
      </View>
      
      <View style={styles.scoreRow}>
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{match.team1_players.join(' & ')}</Text>
          <Text style={styles.score}>{match.team1_score}</Text>
        </View>
        <Text style={styles.vs}>vs</Text>
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{match.team2_players.join(' & ')}</Text>
          <Text style={styles.score}>{match.team2_score}</Text>
        </View>
      </View>
      
      <Text style={styles.type}>{match.match_type.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  date: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.radius.full,
  },
  badgeText: {
    color: theme.colors.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamInfo: {
    flex: 1,
    alignItems: 'center',
  },
  teamName: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  score: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  vs: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginHorizontal: theme.spacing.sm,
  },
  type: {
    color: theme.colors.textMuted,
    fontSize: 10,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
    letterSpacing: 1,
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../constants/theme';
import { MatchState } from '../lib/matchUtils';
import { StatCard } from '../components/StatCard';
import { supabase } from '../lib/supabase';

export default function MatchSummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const matchState: MatchState = JSON.parse(params.matchState as string);
  const [saving, setSaving] = useState(false);

  const totalRallies = matchState.rallies.length;
  const team1Points = matchState.team1Score;
  const team2Points = matchState.team2Score;
  const team1Percent = totalRallies > 0 ? Math.round((team1Points / totalRallies) * 100) : 0;
  const team2Percent = totalRallies > 0 ? Math.round((team2Points / totalRallies) * 100) : 0;
  
  const duration = Math.round((new Date().getTime() - new Date(matchState.startedAt).getTime()) / 60000);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from('matches').insert({
        team1_players: matchState.team1Players,
        team2_players: matchState.team2Players,
        team1_score: matchState.team1Score,
        team2_score: matchState.team2Score,
        match_type: matchState.matchType,
        winner: matchState.team1Score > matchState.team2Score ? 'team1' : 'team2',
        duration_seconds: duration * 60,
        rallies: matchState.rallies,
      });

      if (error) throw error;
      Alert.alert('Success', 'Match saved to history!');
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.winnerBanner}>
        <Text style={styles.winnerLabel}>WINNER</Text>
        <Text style={styles.winnerName}>
          {matchState.team1Score > matchState.team2Score 
            ? matchState.team1Players.join(' & ') 
            : matchState.team2Players.join(' & ')}
        </Text>
      </View>

      <View style={styles.scoreRow}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreTeam}>{matchState.team1Players.join(' & ')}</Text>
          <Text style={styles.scoreValue}>{matchState.team1Score}</Text>
        </View>
        <Text style={styles.scoreDivider}>-</Text>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreTeam}>{matchState.team2Players.join(' & ')}</Text>
          <Text style={styles.scoreValue}>{matchState.team2Score}</Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <StatCard label="Total Rallies" value={totalRallies.toString()} />
        <StatCard label="Duration" value={`${duration}m`} />
        <StatCard label="Team 1 Win %" value={`${team1Percent}%`} />
        <StatCard label="Team 2 Win %" value={`${team2Percent}%`} />
      </View>

      <View style={styles.timeline}>
        <Text style={styles.sectionTitle}>Rally Timeline (Last 10)</Text>
        <View style={styles.dotRow}>
          {matchState.rallies.slice(-10).map((r, i) => (
            <View 
              key={i} 
              style={[styles.dot, { backgroundColor: r.winner === 'team1' ? theme.colors.primary : theme.colors.secondary }]} 
            />
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.saveButton, saving && { opacity: 0.7 }]} 
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Save Match'}</Text>
        </TouchableOpacity>

        <View style={styles.secondaryActions}>
          <TouchableOpacity style={styles.outlineButton} onPress={() => router.push('/new-match')}>
            <Text style={styles.outlineButtonText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineButton} onPress={() => router.replace('/')}>
            <Text style={styles.outlineButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  winnerBanner: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  winnerLabel: {
    color: theme.colors.textMuted,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  winnerName: {
    color: theme.colors.primary,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: theme.spacing.xs,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  scoreBox: {
    alignItems: 'center',
    flex: 1,
  },
  scoreTeam: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginBottom: theme.spacing.xs,
  },
  scoreValue: {
    color: theme.colors.text,
    fontSize: 48,
    fontWeight: 'bold',
  },
  scoreDivider: {
    color: theme.colors.border,
    fontSize: 32,
    marginHorizontal: theme.spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  timeline: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },
  dotRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  actions: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xxl,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    alignItems: 'center',
  },
  saveButtonText: {
    color: theme.colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  outlineButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: theme.colors.text,
    fontWeight: 'bold',
  },
});

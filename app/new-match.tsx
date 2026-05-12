import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../constants/theme';

export default function NewMatchScreen() {
  const router = useRouter();
  const [matchType, setMatchType] = useState<'singles' | 'doubles'>('singles');
  const [locationType, setLocationType] = useState<'indoor' | 'outdoor'>('indoor');
  const [players, setPlayers] = useState({
    team1: ['', ''],
    team2: ['', ''],
  });

  const handleStartMatch = () => {
    const team1Players = matchType === 'singles' ? [players.team1[0]] : [players.team1[0], players.team1[1]];
    const team2Players = matchType === 'singles' ? [players.team2[0]] : [players.team2[0], players.team2[1]];
    
    router.push({
      pathname: '/live-match',
      params: {
        team1Players: JSON.stringify(team1Players),
        team2Players: JSON.stringify(team2Players),
        matchType,
        locationType,
      }
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Match Type</Text>
      <View style={styles.toggleRow}>
        <TouchableOpacity 
          style={[styles.toggleButton, matchType === 'singles' && styles.activeToggle]}
          onPress={() => setMatchType('singles')}
        >
          <Text style={[styles.toggleText, matchType === 'singles' && styles.activeToggleText]}>Singles</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, matchType === 'doubles' && styles.activeToggle]}
          onPress={() => setMatchType('doubles')}
        >
          <Text style={[styles.toggleText, matchType === 'doubles' && styles.activeToggleText]}>Doubles</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Players</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.subLabel}>Team 1</Text>
        <TextInput 
          style={styles.input}
          placeholder={matchType === 'singles' ? "Your Name" : "Player 1"}
          placeholderTextColor={theme.colors.textMuted}
          value={players.team1[0]}
          onChangeText={(text) => setPlayers(prev => ({ ...prev, team1: [text, prev.team1[1]] }))}
        />
        {matchType === 'doubles' && (
          <TextInput 
            style={styles.input}
            placeholder="Partner"
            placeholderTextColor={theme.colors.textMuted}
            value={players.team1[1]}
            onChangeText={(text) => setPlayers(prev => ({ ...prev, team1: [prev.team1[0], text] }))}
          />
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.subLabel}>Team 2</Text>
        <TextInput 
          style={styles.input}
          placeholder={matchType === 'singles' ? "Opponent" : "Opponent 1"}
          placeholderTextColor={theme.colors.textMuted}
          value={players.team2[0]}
          onChangeText={(text) => setPlayers(prev => ({ ...prev, team2: [text, prev.team2[1]] }))}
        />
        {matchType === 'doubles' && (
          <TextInput 
            style={styles.input}
            placeholder="Opponent 2"
            placeholderTextColor={theme.colors.textMuted}
            value={players.team2[1]}
            onChangeText={(text) => setPlayers(prev => ({ ...prev, team2: [prev.team2[0], text] }))}
          />
        )}
      </View>

      <Text style={styles.label}>Location</Text>
      <View style={styles.toggleRow}>
        <TouchableOpacity 
          style={[styles.toggleButton, locationType === 'indoor' && styles.activeToggle]}
          onPress={() => setLocationType('indoor')}
        >
          <Text style={[styles.toggleText, locationType === 'indoor' && styles.activeToggleText]}>Indoor</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, locationType === 'outdoor' && styles.activeToggle]}
          onPress={() => setLocationType('outdoor')}
        >
          <Text style={[styles.toggleText, locationType === 'outdoor' && styles.activeToggleText]}>Outdoor</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStartMatch}>
        <Text style={styles.startButtonText}>Start Match</Text>
      </TouchableOpacity>
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
  label: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  subLabel: {
    color: theme.colors.textMuted,
    fontSize: 14,
    marginBottom: theme.spacing.xs,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  toggleButton: {
    flex: 1,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  toggleText: {
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  activeToggleText: {
    color: theme.colors.background,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  startButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xxl,
  },
  startButtonText: {
    color: theme.colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

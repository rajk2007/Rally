import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../constants/theme';
import { initMatch, scorePoint, checkWinner, getServingPlayer, MatchState, Side } from '../lib/matchUtils';
import { ScoreButton } from '../components/ScoreButton';
import { ServeIndicator } from '../components/ServeIndicator';

export default function LiveMatchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const team1Players = JSON.parse(params.team1Players as string);
  const team2Players = JSON.parse(params.team2Players as string);
  const matchType = params.matchType as any;
  
  const [matchState, setMatchState] = useState<MatchState>(
    initMatch(matchType, team1Players, team2Players)
  );
  const [winner, setWinner] = useState<Side | null>(null);

  const handleScore = (side: Side) => {
    const newState = scorePoint(matchState, side);
    setMatchState(newState);
    const win = checkWinner(newState);
    if (win) setWinner(win);
  };

  const handleUndo = () => {
    if (matchState.rallies.length === 0) return;
    const newRallies = [...matchState.rallies];
    newRallies.pop();
    
    let newState = initMatch(matchType, team1Players, team2Players);
    newRallies.forEach(r => {
      newState = scorePoint(newState, r.winner);
    });
    setMatchState(newState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <View style={styles.teamZone}>
          <ScoreButton 
            teamName={team1Players.join(' & ')}
            score={matchState.team1Score}
            isServing={matchState.servingSide === 'team1'}
            onPress={() => handleScore('team1')}
          />
          {matchState.servingSide === 'team1' && (
            <ServeIndicator playerName={getServingPlayer(matchState)} />
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.teamZone}>
          <ScoreButton 
            teamName={team2Players.join(' & ')}
            score={matchState.team2Score}
            isServing={matchState.servingSide === 'team2'}
            onPress={() => handleScore('team2')}
          />
          {matchState.servingSide === 'team2' && (
            <ServeIndicator playerName={getServingPlayer(matchState)} />
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.undoButton} onPress={handleUndo}>
        <Text style={styles.undoText}>Undo Last Point</Text>
      </TouchableOpacity>

      <Modal visible={!!winner} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalWinner}>
              {winner === 'team1' ? team1Players.join(' & ') : team2Players.join(' & ')} Wins!
            </Text>
            <Text style={styles.modalScore}>
              {matchState.team1Score} - {matchState.team2Score}
            </Text>
            <TouchableOpacity 
              style={styles.summaryButton}
              onPress={() => router.push({
                pathname: '/match-summary',
                params: { matchState: JSON.stringify(matchState) }
              })}
            >
              <Text style={styles.summaryButtonText}>View Summary</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scoreContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  teamZone: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xxl,
  },
  undoButton: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    alignSelf: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  undoText: {
    color: theme.colors.textMuted,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.lg,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  modalTitle: {
    color: theme.colors.textMuted,
    fontSize: 18,
    marginBottom: theme.spacing.sm,
  },
  modalWinner: {
    color: theme.colors.primary,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  modalScore: {
    color: theme.colors.text,
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xl,
  },
  summaryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radius.md,
  },
  summaryButtonText: {
    color: theme.colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

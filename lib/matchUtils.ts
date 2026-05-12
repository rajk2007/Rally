export type MatchType = 'singles' | 'doubles';
export type Side = 'team1' | 'team2';
export interface MatchState {
  team1Score: number;
  team2Score: number;
  servingSide: Side;
  serverIndex: number;
  team1Players: string[];
  team2Players: string[];
  matchType: MatchType;
  rallies: Rally[];
  startedAt: string;
}
export interface Rally {
  winner: Side;
  timestamp: string;
}
export function initMatch(
  matchType: MatchType,
  team1Players: string[],
  team2Players: string[]
): MatchState {
  return {
    team1Score: 0,
    team2Score: 0,
    servingSide: 'team1',
    serverIndex: 0,
    team1Players,
    team2Players,
    matchType,
    rallies: [],
    startedAt: new Date().toISOString(),
  };
}
export function scorePoint(state: MatchState, winner: Side): MatchState {
  const newRally: Rally = { winner, timestamp: new Date().toISOString() };
  const newState = { ...state, rallies: [...state.rallies, newRally] };
  if (winner === 'team1') {
    newState.team1Score = state.team1Score + 1;
    if (state.servingSide !== 'team1') {
      newState.servingSide = 'team1';
      newState.serverIndex = 0;
    }
  } else {
    newState.team2Score = state.team2Score + 1;
    if (state.servingSide !== 'team2') {
      newState.servingSide = 'team2';
      newState.serverIndex = 0;
    }
  }
  return newState;
}
export function checkWinner(state: MatchState): Side | null {
  const { team1Score, team2Score } = state;
  if (team1Score >= 11 && team1Score - team2Score >= 2) return 'team1';
  if (team2Score >= 11 && team2Score - team1Score >= 2) return 'team2';
  return null;
}
export function getServingPlayer(state: MatchState): string {
  const team = state.servingSide === 'team1'
    ? state.team1Players
    : state.team2Players;
  return team[state.serverIndex] ?? team[0];
}

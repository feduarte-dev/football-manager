import { IMatches } from '../Interfaces/matches/iMatches';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';

export const totalGames = (id: number, matches: IMatches[]): number => {
  const filteredMatches = matches.filter(
    (match) => match.homeTeamId === id || match.awayTeamId === id,
  );

  return filteredMatches.length;
};

export const totalPoints = (id: number, matches: IMatches[]): number => {
  let count = 0;
  const filteredMatches = matches.filter(
    (match) => match.homeTeamId === id || match.awayTeamId === id,
  );

  filteredMatches.forEach((match) => {
    if (match.homeTeamId === id && match.homeTeamGoals > match.awayTeamGoals) count += 3;
    else if (match.homeTeamGoals > match.awayTeamGoals) count += 1;
  });

  return count;
};

export const totalVictories = (id: number, matches: IMatches[]): number => {
  let count = 0;
  const filteredMatches = matches.filter(
    (match) => match.homeTeamId === id || match.awayTeamId === id,
  );

  filteredMatches.forEach((match) => {
    if ((match.homeTeamId === id && match.homeTeamGoals > match.awayTeamGoals)
        || (match.awayTeamId === id && match.awayTeamGoals > match.homeTeamGoals)) count += 1;
  });

  return count;
};

export const totalDraws = (id: number, matches: IMatches[]): number => {
  let count = 0;
  const filteredMatches = matches.filter(
    (match) => match.homeTeamId === id || match.awayTeamId === id,
  );

  filteredMatches.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) count += 1;
  });

  return count;
};

export const totalLosses = (id: number, matches: IMatches[]): number => {
  let count = 0;
  const filteredMatches = matches.filter(
    (match) => match.homeTeamId === id || match.awayTeamId === id,
  );

  filteredMatches.forEach((match) => {
    if ((match.homeTeamId === id && match.homeTeamGoals < match.awayTeamGoals)
          || (match.awayTeamId === id && match.awayTeamGoals < match.homeTeamGoals)) count += 1;
  });

  return count;
};

export const goalsFavor = (id: number, matches: IMatches[]): number => {
  let count = 0;
  const filteredMatches = matches.filter(
    (match) => match.homeTeamId === id || match.awayTeamId === id,
  );

  filteredMatches.forEach((match) => {
    if (match.homeTeamId === id) count += match.homeTeamGoals;
    else if (match.awayTeamId === id) count += match.awayTeamGoals;
  });

  return count;
};

export const goalsOwn = (id: number, matches: IMatches[]): number => {
  let count = 0;
  const filteredMatches = matches.filter(
    (match) => match.homeTeamId === id || match.awayTeamId === id,
  );

  filteredMatches.forEach((match) => {
    if (match.homeTeamId === id) count += match.awayTeamGoals;
    else if (match.awayTeamId === id) count += match.homeTeamGoals;
  });

  return count;
};

export const goalsBalance = (id: number, matches: IMatches[]): number =>
  goalsFavor(id, matches) - goalsOwn(id, matches);

export const efficiency = (id: number, matches: IMatches[]): string =>
  ((totalPoints(id, matches) / (totalGames(id, matches) * 3)) * 100).toFixed(2);

export const sortTeams = (team: ILeaderboard[]): ILeaderboard[] => {
  team.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
  return team;
};

export default {
  totalGames,
  totalPoints,
  totalVictories,
  totalDraws,
  totalLosses,
  goalsFavor,
  goalsOwn,
  goalsBalance,
  efficiency,
  sortTeams,
};

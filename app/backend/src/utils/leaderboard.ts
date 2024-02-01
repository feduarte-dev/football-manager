import { ITeams } from '../Interfaces/teams/ITeams';
import { IMatches } from '../Interfaces/matches/iMatches';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';

export const totalGames = (id: number, matches: IMatches[], type: string): IMatches[] => {
  switch (type) {
    case 'home': {
      const filteredMatches = matches.filter((match) => match.homeTeamId === id);
      return filteredMatches;
    }
    case 'away':
    {
      const filteredMatches = matches.filter((match) => match.awayTeamId === id);
      return filteredMatches;
    }
    default: {
      const filteredMatches = matches
        .filter((match) => match.homeTeamId === id || match.awayTeamId === id);
      return filteredMatches;
    }
  }
};

export const totalVictories = (id: number, matches: IMatches[], type: string): number => {
  let count = 0;
  const filteredMatches = totalGames(id, matches, type);

  filteredMatches.forEach((match) => {
    const isHomeVictory = type === 'home' && match.homeTeamGoals > match.awayTeamGoals;
    const isAwayVictory = type === 'away' && match.awayTeamGoals > match.homeTeamGoals;
    const isVictory = type !== 'home'
      && type !== 'away'
      && ((match.homeTeamId === id && match.homeTeamGoals > match.awayTeamGoals)
        || (match.awayTeamId === id && match.awayTeamGoals > match.homeTeamGoals));

    if (isHomeVictory || isAwayVictory || isVictory) {
      count += 1;
    }
  });

  return count;
};

export const totalDraws = (id: number, matches: IMatches[], type: string): number => {
  let count = 0;
  const filteredMatches = totalGames(id, matches, type);

  filteredMatches.forEach((match) => {
    const isHomeDraw = type === 'home' && match.homeTeamGoals === match.awayTeamGoals;
    const isAwayDraw = type === 'away' && match.awayTeamGoals === match.homeTeamGoals;
    const isDraw = type !== 'home'
      && type !== 'away'
      && ((match.homeTeamId === id && match.homeTeamGoals === match.awayTeamGoals)
        || (match.awayTeamId === id && match.awayTeamGoals === match.homeTeamGoals));

    if (isHomeDraw || isAwayDraw || isDraw) {
      count += 1;
    }
  });

  return count;
};

export const totalPoints = (id: number, matches: IMatches[], type: string): number => {
  const result = (totalVictories(id, matches, type) * 3) + (totalDraws(id, matches, type));
  return result;
};

export const totalLosses = (id: number, matches: IMatches[], type: string): number => {
  let count = 0;
  const filteredMatches = totalGames(id, matches, type);

  filteredMatches.forEach((match) => {
    const isHomeLoss = type === 'home' && match.homeTeamGoals < match.awayTeamGoals;
    const isAwayLoss = type === 'away' && match.awayTeamGoals < match.homeTeamGoals;
    const isLoss = type !== 'home'
      && type !== 'away'
      && ((match.homeTeamId === id && match.homeTeamGoals < match.awayTeamGoals)
        || (match.awayTeamId === id && match.awayTeamGoals < match.homeTeamGoals));

    if (isHomeLoss || isAwayLoss || isLoss) {
      count += 1;
    }
  });

  return count;
};

export const goalsFavor = (id: number, matches: IMatches[], type: string): number => {
  let count = 0;
  const filteredMatches = totalGames(id, matches, type);

  switch (type) {
    case 'home': filteredMatches.forEach((match) => {
      count += match.homeTeamGoals;
    });
      break;
    case 'away': filteredMatches.forEach((match) => {
      count += match.awayTeamGoals;
    });
      break;
    default: filteredMatches.forEach((match) => {
      if (match.homeTeamId === id) count += match.homeTeamGoals;
      if (match.awayTeamId === id) count += match.awayTeamGoals;
    });
  }

  return count;
};

export const goalsOwn = (id: number, matches: IMatches[], type: string): number => {
  let count = 0;
  const filteredMatches = totalGames(id, matches, type);

  switch (type) {
    case 'home': filteredMatches.forEach((match) => {
      count += match.awayTeamGoals;
    });
      break;
    case 'away': filteredMatches.forEach((match) => {
      count += match.homeTeamGoals;
    });
      break;
    default: filteredMatches.forEach((match) => {
      if (match.homeTeamId === id) count += match.awayTeamGoals;
      if (match.awayTeamId === id) count += match.homeTeamGoals;
    });
  }

  return count;
};

export const goalsBalance = (id: number, matches: IMatches[], type: string): number =>
  goalsFavor(id, matches, type) - goalsOwn(id, matches, type);

export const efficiency = (id: number, matches: IMatches[], type: string): string =>
  ((totalPoints(id, matches, type) / (totalGames(id, matches, type).length * 3)) * 100).toFixed(2);

export const getSortedLeaderboard = (team: ILeaderboard[]): ILeaderboard[] => {
  team.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
  return team;
};

export const getLeaderboard = (team: ITeams, matches: IMatches[], type: string) => ({
  name: team.teamName,
  totalPoints: totalPoints(team.id, matches, type),
  totalGames: totalGames(team.id, matches, type).length,
  totalVictories: totalVictories(team.id, matches, type),
  totalDraws: totalDraws(team.id, matches, type),
  totalLosses: totalLosses(team.id, matches, type),
  goalsFavor: goalsFavor(team.id, matches, type),
  goalsOwn: goalsOwn(team.id, matches, type),
  goalsBalance: goalsBalance(team.id, matches, type),
  efficiency: efficiency(team.id, matches, type),
}
);

export default {
  getLeaderboard,
  getSortedLeaderboard,
};

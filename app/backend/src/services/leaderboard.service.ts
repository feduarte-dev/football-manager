import TeamsModel from '../models/teams.model';
import MatchesModel from '../models/matches.model';
import { totalPoints, totalGames, totalVictories, totalDraws,
  totalLosses, goalsFavor, goalsOwn, goalsBalance, efficiency,
  sortTeams } from '../utils/leaderboard';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchesModel(),
    private teamsModel = new TeamsModel(),
  ) {}

  public async getLeaderboard() {
    const matches = await this.matchModel.getMatchesByProgress(false);
    const teams = await this.teamsModel.getAllTeams();
    const leaderboard = teams.map((team) => ({
      name: team.teamName,
      totalPoints: totalPoints(team.id, matches),
      totalGames: totalGames(team.id, matches),
      totalVictories: totalVictories(team.id, matches),
      totalDraws: totalDraws(team.id, matches),
      totalLosses: totalLosses(team.id, matches),
      goalsFavor: goalsFavor(team.id, matches),
      goalsOwn: goalsOwn(team.id, matches),
      goalsBalance: goalsBalance(team.id, matches),
      efficiency: efficiency(team.id, matches),
    }));
    sortTeams(leaderboard);
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}

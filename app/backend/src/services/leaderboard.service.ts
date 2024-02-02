import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboardService } from '../Interfaces/leaderboard/ILeaderboardService';
import TeamsModel from '../models/teams.model';
import MatchesModel from '../models/matches.model';
import { getLeaderboard, getSortedLeaderboard } from '../utils/leaderboard';

export default class LeaderboardService implements ILeaderboardService {
  constructor(
    private matchModel = new MatchesModel(),
    private teamsModel = new TeamsModel(),
  ) {}

  async getLeaderboard(type: string): Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchModel.getMatchesByProgress(false);
    const teams = await this.teamsModel.getAllTeams();
    const leaderboard = teams.map((team) => getLeaderboard(team, matches, type));
    getSortedLeaderboard(leaderboard);

    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}

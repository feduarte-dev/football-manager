import { ICreatedResponse } from '../Interfaces/user';
import { IGoals } from '../Interfaces/matches/IGoals';
import TeamsModel from '../models/teams.model';
import { IMatches } from '../Interfaces/matches/iMatches';
import MatchesModel from '../models/matches.model';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel = new MatchesModel(),
    private teamsModel = new TeamsModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.getAllMatches();

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async getMatchesByProgress(inProgress: boolean): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.getMatchesByProgress(inProgress);

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async endMatch(id: number): Promise<ServiceResponse<ICreatedResponse>> {
    await this.matchesModel.endMatch(id);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async createNewMatch(matchData: IMatches): Promise<ServiceResponse<IMatches>> {
    const { homeTeamId, awayTeamId } = matchData;
    const teamsArray = [homeTeamId, awayTeamId];

    const isValidTeam = await Promise
      .all(teamsArray.map((team) => this.teamsModel.getTeamById(team)));

    if (homeTeamId === awayTeamId) {
      return { status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    if (isValidTeam.includes(null)) {
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }

    const newMatch = await this.matchesModel.createNewMatch(matchData);

    return { status: 'CREATED', data: newMatch };
  }

  public async updateGoals(id: number, goals: IGoals): Promise<ServiceResponse<string>> {
    const updatedMatch = await this.matchesModel.updateGoals(id, goals);

    return { status: 'SUCCESSFUL', data: updatedMatch };
  }
}

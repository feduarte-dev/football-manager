import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import TeamsModel from '../models/teams.model';
import { ITeams } from '../Interfaces/teams/ITeams';

export default class TeamsService {
  constructor(private teamsModel: ITeamsModel = new TeamsModel()) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamsModel.getAllTeams();

    return { status: 'SUCCESSFUL', data: teams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeams | null>> {
    const team = await this.teamsModel.getTeamById(id);

    return { status: 'SUCCESSFUL', data: team };
  }
}

import SequelizeTeams from '../database/models/teams.model';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import { ITeams } from '../Interfaces/teams/ITeams';

export default class TeamsModel implements ITeamsModel<ITeams> {
  private model = SequelizeTeams;

  async getAllTeams(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async getTeamById(id: number): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    return dbData;
  }
}

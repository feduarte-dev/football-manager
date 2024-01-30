import SequelizeTeams from '../database/models/teamsModel';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import { ITeams } from '../Interfaces/teams/ITeams';

export default class TeamsModel implements ITeamsModel {
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

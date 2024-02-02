import SequelizeTeams from '../database/models/teams.model';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async getAllTeams() {
    const dbData = await this.model.findAll();

    return dbData;
  }

  async getTeamById(id: number) {
    const dbData = await this.model.findByPk(id);

    if (!dbData) {
      return null;
    }

    return dbData;
  }
}

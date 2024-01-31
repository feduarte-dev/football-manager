import SequelizeTeams from '../database/models/teams.model';
import SequelizeMatches from '../database/models/matches.model';
import { IMatches } from '../Interfaces/matches/iMatches';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';

export default class MatchesModel implements IMatchesModel<IMatches> {
  private model = SequelizeMatches;

  async getAllMatches(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData;
  }

  async getMatchesByProgress(inProgress: boolean): Promise<IMatches[]> {
    const dbData = await this.model.findAll({ where: { inProgress },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return dbData;
  }
}

import SequelizeTeams from '../database/models/teams.model';
import SequelizeMatches from '../database/models/matches.model';
import { IMatches } from '../Interfaces/matches/iMatches';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import { IGoals } from '../Interfaces/matches/IGoals';

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

  async endMatch(id: number) {
    const [affectedRows] = await this.model.update({ inProgress: false }, { where: { id } });

    if (affectedRows === 0) {
      return null;
    }
  }

  async createNewMatch(matchData: IMatches) {
    const dbData = await this.model.create(matchData);

    return dbData;
  }

  async updateGoals(id: number, { homeTeamGoals, awayTeamGoals }: IGoals) : Promise<string> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return 'Match Updated!';
  }
}

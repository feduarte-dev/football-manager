import MatchesModel from '../models/matches.model';

export default class MatchesService {
  constructor(private matchesModel = new MatchesModel()) {}

  public async getAllMatches() {
    const matches = await this.matchesModel.getAllMatches();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async getMatchesByProgress(inProgress: boolean) {
    const matches = await this.matchesModel.getMatchesByProgress(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  }
}

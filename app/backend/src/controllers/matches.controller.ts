import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getMatches(req: Request, res: Response) {
    if (req.query.inProgress) {
      const { inProgress } = req.query;
      const boolean = inProgress === 'true';
      const { status, data } = await this.matchesService.getMatchesByProgress(boolean);
      return res.status(mapStatusHTTP(status)).json(data);
    }

    const { status, data } = await this.matchesService.getAllMatches();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}

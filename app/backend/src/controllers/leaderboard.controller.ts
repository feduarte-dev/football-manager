import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async getLeaderboard(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getLeaderboard();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}

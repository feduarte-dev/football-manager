import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async getLeaderboardHome(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getLeaderboard('home');

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getLeaderboardAway(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getLeaderboard('away');

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getLeaderboard(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getLeaderboard('all');

    return res.status(mapStatusHTTP(status)).json(data);
  }
}

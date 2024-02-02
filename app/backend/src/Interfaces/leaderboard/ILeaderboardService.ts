import { ServiceResponse } from '../ServiceResponse';
import { ILeaderboard } from './ILeaderboard';

export interface ILeaderboardService {
  getLeaderboard(type: string): Promise<ServiceResponse<ILeaderboard[]>>
}

import { IGoals } from './IGoals';
import { IMatches } from './iMatches';

export interface IMatchesModel<T> {
  getAllMatches(): Promise<T[]>
  getMatchesByProgress(inProgress: boolean): Promise<T[]>
  createNewMatch(matchData: IMatches): Promise<T>
  updateGoals(id: number, goals: IGoals): Promise<string>
}

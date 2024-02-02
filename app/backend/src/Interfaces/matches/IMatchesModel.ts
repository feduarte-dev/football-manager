import { IGoals } from './IGoals';
import { IMatches } from './iMatches';

export interface IMatchesModel {
  getAllMatches(): Promise<IMatches[]>;
  getMatchesByProgress(inProgress: boolean): Promise<IMatches[]>;
  endMatch(id: number): Promise<void | null>;
  createNewMatch(matchData: IMatches): Promise<IMatches>;
  updateGoals(id: number, goals: IGoals): Promise<string>;
}

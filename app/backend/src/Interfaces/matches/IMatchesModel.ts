export interface IMatchesModel<T> {
  getAllMatches(): Promise<T[]>
  getMatchesByProgress(inProgress: boolean): Promise<T[]>
}

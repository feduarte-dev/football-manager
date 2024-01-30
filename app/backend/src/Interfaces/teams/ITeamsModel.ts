export interface ITeamsModel<T> {
  getAllTeams(): Promise<T[]>;
  getTeamById(id: number): Promise<T | null>;
}

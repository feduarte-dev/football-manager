export interface ICRUDModelReader<T> {
  getAllTeams(): Promise<T[]>,
  getTeamById(id: number): Promise<T | null>
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICRUDModel<T> extends ICRUDModelReader<T> { }

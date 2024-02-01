export interface ILeaderboardModel<T> {
  getLeaderboard(): Promise<T[]>
}

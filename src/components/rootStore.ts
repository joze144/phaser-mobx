import { GameStore, IGameStore } from './game/gameStore';

export interface IRootStore {
  gameStore?: IGameStore;
}

export class RootStore implements IRootStore{
  gameStore: GameStore = new GameStore(this)
}

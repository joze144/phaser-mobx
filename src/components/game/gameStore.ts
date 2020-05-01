import { RootStore } from '../rootStore';
import { action, observable } from 'mobx';

export interface IGameStore {
  currentLevel: number;
  currentScore: number;
  gameStart(): void;
  gameEnd(): void;
  increaseScore(total: number): void;
  resetScore(): void;
}

export class GameStore implements IGameStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable isCurrentlyPlaying: boolean = true;
  @observable currentLevel: number = 0;
  @observable currentScore: number = 0;


  @action
  increaseScore(total: number) {
    this.currentScore = total;
  }

  @action
  resetScore() {
    this.currentScore = 0;
  }

  @action
  gameEnd() {
    this.isCurrentlyPlaying = false;
  }

  @action
  gameStart() {
    this.isCurrentlyPlaying = true;
  }
}

import { RootStore } from '../rootStore';
import { action, observable } from 'mobx';

export interface IGameStore {
  currentLevel: number;
  currentScore: number;
  completeLevel(): void;
  increaseScore(total: number): void;
  resetScore(): void;
}

export class GameStore implements IGameStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

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
  completeLevel() {
    this.currentLevel = this.currentLevel + 1;
  }
}

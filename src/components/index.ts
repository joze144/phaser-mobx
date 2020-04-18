import { RootStore } from './rootStore';

export function createStores() {
  const rootStore = new RootStore();

  return {
    rootStore: rootStore,
    gameStore: rootStore.gameStore
  };
}

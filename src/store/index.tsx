export type { RootState, AppStore } from './store';
export { store, setupStore } from './store';
export {
  addFavorite,
  clearFavorites,
  removeFavorite,
  setFavorites,
} from './favoriteSlice';

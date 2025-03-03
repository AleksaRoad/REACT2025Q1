export { store, setupStore, type RootState, type AppStore } from './store';
export {
  addFavorite,
  clearFavorites,
  removeFavorite,
  setFavorites,
} from './favoriteSlice';
export { default as ReduxProvider } from './ReduxProvider';

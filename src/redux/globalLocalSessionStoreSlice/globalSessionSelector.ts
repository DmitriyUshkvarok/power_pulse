import { RootState } from '../store';

const getSelectedCategory = (state: RootState) =>
  state.globalLocalSession.selectedCategory;

const getRecommendation = (state: RootState) =>
  state.globalLocalSession.recommendation;

const getProductData = (state: RootState) =>
  state.globalLocalSession.filteredProductData;

const getSearchText = (state: RootState) => state.globalLocalSession.searchText;

export const sessionSelectors = {
  getSelectedCategory,
  getRecommendation,
  getProductData,
  getSearchText,
};

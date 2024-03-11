import { RootState } from '../store';

const getSelectedCategory = (state: RootState) =>
  state.globalLocalSession.selectedCategory;
const getRecommendation = (state: RootState) =>
  state.globalLocalSession.recommendation;
const getProductData = (state: RootState) =>
  state.globalLocalSession.filteredProductData;

export const sessionSelectors = {
  getSelectedCategory,
  getRecommendation,
  getProductData,
};

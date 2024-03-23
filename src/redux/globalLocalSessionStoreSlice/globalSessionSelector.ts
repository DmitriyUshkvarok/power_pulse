import { RootState } from '../store';

const getSelectedCategory = (state: RootState) =>
  state.globalLocalSession.selectedCategory;

const getRecommendation = (state: RootState) =>
  state.globalLocalSession.recommendation;

const getProductData = (state: RootState) =>
  state.globalLocalSession.filteredProductData;

const getSearchText = (state: RootState) => state.globalLocalSession.searchText;

const getdynamicCalories = (state: RootState) =>
  state.globalLocalSession.dynamicCalories;

const getDate = (state: RootState) => state.globalLocalSession.date;

export const sessionSelectors = {
  getSelectedCategory,
  getRecommendation,
  getProductData,
  getSearchText,
  getdynamicCalories,
  getDate,
};

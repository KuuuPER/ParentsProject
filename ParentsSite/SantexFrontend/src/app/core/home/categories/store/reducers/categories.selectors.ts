import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromCategories from './categories.reducers';
import * as fromIndex from './index';
import * as fromReducers from './';

export const getReducer = 
createFeatureSelector<fromReducers.FeatureState>('categories');

export const getCategoriesState = createSelector(getReducer, fromReducers.getCategories)
export const getIds = createSelector(getCategoriesState, fromCategories.getIds);
export const getPageInfo = createSelector(getCategoriesState, fromCategories.getPageInfo);
export const getCategories = createSelector(getCategoriesState, fromCategories.getCategories);
export const getEditCategory = createSelector(getCategoriesState, fromCategories.getEditCategory);
export const getAllCategories = createSelector(getIds, getCategories, (ids, categories) => {
    return ids.map(id => categories[id]);
});
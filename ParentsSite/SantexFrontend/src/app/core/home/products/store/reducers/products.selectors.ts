import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducers from './';
import * as fromProducts from './products.reducers';
import * as fromCategories from '../../../categories/store/reducers/categories.reducers';
import * as fromManufactures from '../../../manufactures/store/reducers/manufactures.reducers';
import * as fromProviders from '../../../providers/store/reducers/providers.reducers';

export const getReducers = 
createFeatureSelector<fromReducers.FeatureState>('products');

export const getProductsState = createSelector(getReducers, fromReducers.getProducts);

const getIds = createSelector(getProductsState, fromProducts.getIds);
const getProducts = createSelector(getProductsState, fromProducts.getProducts);
export const getPageInfo = createSelector(getProductsState, fromProducts.getPageInfo);
export const getAllProducts = createSelector(getIds, getProducts, (ids, purchases) => {
    return ids.map(id => purchases[id]);
});
export const getEditProduct = createSelector(getProductsState, fromProducts.getEditProduct);

export const getCategoriesState = createSelector(getReducers, fromReducers.getCategories);

const getCategoriesIds = createSelector(getCategoriesState, fromCategories.getIds);
const getCategories = createSelector(getCategoriesState, fromCategories.getCategories);
export const getAllCategories = createSelector(getCategoriesIds, getCategories, (ids, categories) => {
    return ids.map(id => categories[id]);
});

export const getManufacturesState = createSelector(getReducers, fromReducers.getManufactures);

const getManufacturesIds = createSelector(getManufacturesState, fromManufactures.getIds);
const getManufactures = createSelector(getManufacturesState, fromManufactures.getManufactures);
export const getAllManufactures = createSelector(getManufacturesIds, getManufactures, (ids, manufactures) => {
    return ids.map(id => manufactures[id]);
});

export const getProvidersState = createSelector(getReducers, fromReducers.getProviders);

const getProvidersIds = createSelector(getProvidersState, fromProviders.getIds);
const getProviders = createSelector(getProvidersState, fromProviders.getProviders);
export const getAllProviders = createSelector(getProvidersIds, getProviders, (ids, providers) => {
    return ids.map(id => providers[id]);
});
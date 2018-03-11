import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromPurchases from './purchases.reducers';
import * as fromProducts from '../../../products/store/reducers/products.reducers';
import * as fromIndex from './index';

const getReducers = createFeatureSelector<fromIndex.FeatureState>('purchases')
const getPurchasesState = 
createSelector(getReducers, fromIndex.getPurchases);

const getIds = createSelector(getPurchasesState, fromPurchases.getIds);
export const getPageInfo = createSelector(getPurchasesState, fromPurchases.getPageInfo);
export const getPurchases = createSelector(getPurchasesState, fromPurchases.getPurchases);
export const getAllPurchases = createSelector(getIds, getPurchases, (ids, purchases) => {
    return ids.map(id => purchases[id]);
});

const getProductsState = 
createSelector(getReducers, r => r.products);
const getProductsIds = createSelector(getProductsState, fromProducts.getIds);
export const getProducts = createSelector(getProductsState, fromProducts.getProducts);
export const getAllProducts = createSelector(getProductsIds, getProducts, (ids, imports) => {
    return ids.map(id => imports[id]);
});
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromPurchases from './purchases.reducers';
import * as fromDeliveries from '../../../deliveries/store/reducers/deliveries.reducers';
import * as fromProducts from '../../../products/store/reducers/products.reducers';
import * as fromIndex from './index';

const getReducers = createFeatureSelector<fromIndex.FeatureState>('purchases')
const getPurchasesState = 
createSelector(getReducers, fromIndex.getPurchases);

const getIds = createSelector(getPurchasesState, fromPurchases.getIds);
export const getNeedDelivery = createSelector(getPurchasesState, fromPurchases.getNeedDelivery);
export const getEditedPurchase = createSelector(getPurchasesState, fromPurchases.getEditedPurchase);
export const getEditedPurchaseUnits = createSelector(getPurchasesState, fromPurchases.getEditedPurchaseUnits);
export const getPurchaseUnits = createSelector(getPurchasesState, fromPurchases.getPurchaseUnits);
export const getEditedPurchaseDeliveries = createSelector(getPurchasesState, fromPurchases.getEditedPurchaseDeliveries);
export const getPageInfo = createSelector(getPurchasesState, fromPurchases.getPageInfo);
export const getPurchases = createSelector(getPurchasesState, fromPurchases.getPurchases);
export const getAllPurchases = createSelector(getIds, getPurchases, (ids, purchases) => {
    return ids.map(id => purchases[id]);
});

const getDeliveriesState = createSelector(getReducers, r => r.deliveries);
export const getDeliveriesIds = createSelector(getDeliveriesState, fromDeliveries.getIds);
export const getDeliveries = createSelector(getDeliveriesState, fromDeliveries.getDeliveries);
export const getAllDeliveries = createSelector(getDeliveriesIds, getDeliveries, (ids, deliveries) => {
    return ids.map(id => deliveries[id]);
});

const getProductsState = 
createSelector(getReducers, r => r.products);
export const getProductsPageInfo = createSelector(getProductsState, fromProducts.getPageInfo);
const getProductsIds = createSelector(getProductsState, fromProducts.getIds);
export const getProducts = createSelector(getProductsState, fromProducts.getProducts);
export const getAllProducts = createSelector(getProductsIds, getProducts, (ids, imports) => {
    return ids.map(id => imports[id]);
});
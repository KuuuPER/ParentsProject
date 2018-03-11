import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducers from './';
import * as fromReturnPurchases from './return-purchases.reducers';
import * as fromPurchases from '../../../purchases/store/reducers/purchases.reducers';

export const getReducers = 
createFeatureSelector<fromReducers.FeatureState>('returnPurchases');
export const getReturnPurchasesState = 
createSelector(getReducers, fromReducers.getReturnPurchases);

export const getIds = createSelector(getReturnPurchasesState, fromReturnPurchases.getIds);
export const getReturnPurchases = createSelector(getReturnPurchasesState, fromReturnPurchases.getReturnPurchases);
export const getAllReturnPurchases = createSelector(getIds, getReturnPurchases, (ids, returnPurchases) => {
    return ids.map(id => returnPurchases[id]);
});

export const getPurchasesState = 
createSelector(getReducers, fromReducers.getPurchases);

export const getPurchaseIds = createSelector(getPurchasesState, fromPurchases.getIds);
export const getPurchases = createSelector(getPurchasesState, fromPurchases.getPurchases);
export const getAllPurchases = createSelector(getIds, getPurchases, (ids, purchases) => {
    return ids.map(id => purchases[id]);
});
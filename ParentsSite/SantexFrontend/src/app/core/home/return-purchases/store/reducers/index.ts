import { ActionReducerMap, ActionReducer, MetaReducer, createFeatureSelector } from '@ngrx/store';

import * as fromReturnPurchases from './return-purchases.reducers';
import * as fromPurchases from '../../../purchases/store/reducers/purchases.reducers';

export interface FeatureState{
    returnPurchases: fromReturnPurchases.State,
    purchases: fromPurchases.State
}

export const reducers: ActionReducerMap<FeatureState> ={
    returnPurchases: fromReturnPurchases.returnPurchasesReducer,
    purchases: fromPurchases.purchasesReducer
};

export const getReturnPurchases = (state: FeatureState) => state.returnPurchases;
export const getPurchases = (state: FeatureState) => state.purchases;
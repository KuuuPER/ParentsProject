import { ActionReducerMap, ActionReducer, MetaReducer, createFeatureSelector } from '@ngrx/store';

import * as fromPurchases from './purchases.reducers';
import * as fromProviders from '../../../providers/store/reducers/providers.reducers';
import * as fromProducts from '../../../products/store/reducers/products.reducers';

export interface FeatureState{
    purchases: fromPurchases.State,
    products: fromProducts.State
}

export const reducers: ActionReducerMap<FeatureState> ={
    purchases: fromPurchases.purchasesReducer,
    products: fromProducts.productsReducer
};

export const getPurchases = (state: FeatureState) => state.purchases;
export const getProducts = (state: FeatureState) => state.products;
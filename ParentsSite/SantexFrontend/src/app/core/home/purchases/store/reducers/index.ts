import { ActionReducerMap, ActionReducer, MetaReducer, createFeatureSelector } from '@ngrx/store';

import * as fromPurchases from './purchases.reducers';
import * as fromDeliveries from '../../../deliveries/store/reducers/deliveries.reducers';
import * as fromProviders from '../../../providers/store/reducers/providers.reducers';
import * as fromProducts from '../../../products/store/reducers/products.reducers';

export interface FeatureState{
    purchases: fromPurchases.State,
    deliveries: fromDeliveries.State,
    products: fromProducts.State
}

export const reducers: ActionReducerMap<FeatureState> ={
    purchases: fromPurchases.purchasesReducer,
    deliveries: fromDeliveries.deliveriesReducer,
    products: fromProducts.productsReducer
};

export const getPurchases = (state: FeatureState) => state.purchases;
export const getDeliveries = (state: FeatureState) => state.deliveries;
export const getProducts = (state: FeatureState) => state.products;
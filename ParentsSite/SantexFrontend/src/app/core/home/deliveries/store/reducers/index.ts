import { ActionReducerMap, ActionReducer, MetaReducer, createFeatureSelector } from '@ngrx/store';

import * as fromDeliveries from './deliveries.reducers';
import * as fromDrivers from '../../../drivers/store/reducers/drivers.reducers';
import * as fromProducts from '../../../products/store/reducers/products.reducers';

export interface FeatureState{
    deliveries: fromDeliveries.State,
    products: fromProducts.State,
    drivers: fromDrivers.State,
}

export const reducers: ActionReducerMap<FeatureState> ={
    deliveries: fromDeliveries.deliveriesReducer,
    products: fromProducts.productsReducer,
    drivers: fromDrivers.driversReducer,
};

export const getDeliveries = (state: FeatureState) => state.deliveries;
export const getProducts = (state: FeatureState) => state.products;
export const getDrivers = (state: FeatureState) => state.drivers;
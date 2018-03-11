import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromDeliveries from './deliveries.reducers';
import * as fromDrivers from '../../../drivers/store/reducers/drivers.reducers';
import * as fromProducts from '../../../products/store/reducers/products.reducers';
import * as fromReducers from './';

export const getReducers = 
createFeatureSelector<fromReducers.FeatureState>('deliveries');

export const getDeliveriesState = 
createSelector(getReducers, fromReducers.getDeliveries);

export const getDeliveriesIds = createSelector(getDeliveriesState, fromDeliveries.getIds);
export const getDeliveries = createSelector(getDeliveriesState, fromDeliveries.getDeliveries);
export const getAllDeliveries = createSelector(getDeliveriesIds, getDeliveries, (ids, deliveries) => {
    return ids.map(id => deliveries[id]);
});
export const getPageInfo = createSelector(getDeliveriesState, fromDeliveries.getPageInfo);

const getDriversState = createSelector(getReducers, r => r.drivers);

const getDriversIds = createSelector(getDriversState, fromDrivers.getIds);
export const getDrivers = createSelector(getDriversState, fromDrivers.getDrivers);
export const getAllDrivers = createSelector(getDriversIds, getDrivers, (ids, drivers) => {
    return ids.map(id => drivers[id]);
});

const getProductsState = createSelector(getReducers, r => r.products);
const getProductsIds = createSelector(getProductsState, fromProducts.getIds);
export const getProducts = createSelector(getProductsState, fromProducts.getProducts);
export const getAllProducts = createSelector(getProductsIds, getProducts, (ids, imports) => {
    return ids.map(id => imports[id]);
});
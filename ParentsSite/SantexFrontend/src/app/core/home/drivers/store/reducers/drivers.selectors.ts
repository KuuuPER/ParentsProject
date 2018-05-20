import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromIndex from './index';
import * as fromDrivers from './drivers.reducers';

export const getReducer = 
createFeatureSelector<fromIndex.FeatureState>('drivers');

export const getDriversState = createSelector(getReducer, fromIndex.getDrivers)
export const getEditedDriver = createSelector(getDriversState, fromDrivers.getEditedDriver)
export const getEditedDriverDeliveries = createSelector(getDriversState, fromDrivers.getEditedDriverDeliveries)
export const getIds = createSelector(getDriversState, fromDrivers.getIds);
export const getPageInfo = createSelector(getDriversState, fromDrivers.getPageInfo);
export const getDrivers = createSelector(getDriversState, fromDrivers.getDrivers);
export const getAllDrivers = createSelector(getIds, getDrivers, (ids, drivers) => {
    return ids.map(id => drivers[id]);
});
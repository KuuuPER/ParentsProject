import * as fromReducers from './';
import * as fromInfos from './info.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getReducers = 
createFeatureSelector<fromReducers.FeatureState>('infos');

export const getInfos = createSelector(getReducers, fromReducers.getInfos);
export const getAllInfos = createSelector(getInfos, fromInfos.getInfos);
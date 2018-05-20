import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromImports from './imports.reducers';
import * as fromProviders from '../../../providers/store/reducers/providers.reducers';
import * as fromProducts from '../../../products/store/reducers/products.reducers';
import * as fromReducers from './';

export const getReducers = 
createFeatureSelector<fromReducers.FeatureState>('imports');

export const getImportsState = createSelector(getReducers, fromReducers.getImports);

const getImportIds = createSelector(getImportsState, fromImports.getIds);
export const getImportProducts = createSelector(getImportsState, fromImports.getImportProducts);
export const getImportProductsPageInfo = createSelector(getImportsState, fromImports.getProductsPageInfo);
export const getPageInfo = createSelector(getImportsState, fromImports.getPageInfo);
export const getEditImport = createSelector(getImportsState, fromImports.getEditImport);
export const getEditImportProducts = createSelector(getImportsState, fromImports.getEditImportProducts);
export const getImports = createSelector(getImportsState, fromImports.getImports);
export const getAllImports = createSelector(getImportIds, getImports, (ids, imports) => {
    return ids.map(id => imports[id]);
});

const getProvidersState = createSelector(getReducers, fromReducers.getProviders);

export const getIds = createSelector(getProvidersState, fromProviders.getIds);
export const getProviders = createSelector(getProvidersState, fromProviders.getProviders);
export const getAllProviders = createSelector(getIds, getProviders, (ids, providers) => {
    return ids.map(id => providers[id]);
});

const getProductsState = createSelector(getReducers, fromReducers.getProducts);

const getProductsIds = createSelector(getProductsState, fromProducts.getIds);
export const getProducts = createSelector(getProductsState, fromProducts.getProducts);
export const getProductsPageInfo = createSelector(getProductsState, fromProducts.getPageInfo);
export const getAllProducts = createSelector(getProductsIds, getProducts, (ids, imports) => {
    return ids.map(id => imports[id]);
});
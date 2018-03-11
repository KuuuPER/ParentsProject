import { ActionReducerMap, ActionReducer, MetaReducer, createFeatureSelector } from '@ngrx/store';

import * as fromImports from './imports.reducers';
import * as fromProviders from '../../../providers/store/reducers/providers.reducers';
import * as fromProducts from '../../../products/store/reducers/products.reducers';

export interface FeatureState{
    imports: fromImports.State,
    providers: fromProviders.State,
    products: fromProducts.State
}

export const reducers: ActionReducerMap<FeatureState> ={
    imports: fromImports.importsReducer,
    providers: fromProviders.providersReducer,
    products: fromProducts.productsReducer
};

export const getImports = (state: FeatureState) => state.imports;
export const getProviders = (state: FeatureState) => state.providers;
export const getProducts = (state: FeatureState) => state.products;
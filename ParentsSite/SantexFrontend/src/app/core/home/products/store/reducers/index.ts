import { ActionReducerMap, ActionReducer, MetaReducer, createFeatureSelector } from '@ngrx/store';

import * as fromProducts     from './products.reducers';
import * as fromCategories   from '../../../categories/store/reducers/categories.reducers';
import * as fromManufactures from '../../../manufactures/store/reducers/manufactures.reducers';
import * as fromProviders    from '../../../providers/store/reducers/providers.reducers';

export interface FeatureState{
    products: fromProducts.State,
    categories: fromCategories.State,
    manufactures: fromManufactures.State,
    providers: fromProviders.State
}

export const reducers: ActionReducerMap<FeatureState> = {
    products: fromProducts.productsReducer,
    categories: fromCategories.categoriesReducer,
    manufactures: fromManufactures.manufacturesReducer,
    providers: fromProviders.providersReducer
};

export const getProducts = (state: FeatureState) => state.products;
export const getCategories = (state: FeatureState) => state.categories;
export const getManufactures = (state: FeatureState) => state.manufactures;
export const getProviders = (state: FeatureState) => state.providers;
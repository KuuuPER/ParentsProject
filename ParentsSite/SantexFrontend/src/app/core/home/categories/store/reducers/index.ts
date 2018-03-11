import { ActionReducerMap, ActionReducer } from '@ngrx/store';

import * as fromCategories from './categories.reducers';

export interface FeatureState{
    categories: fromCategories.State,
}

export const reducer: ActionReducerMap<FeatureState> = {
    categories: fromCategories.categoriesReducer,
};

export const getCategories = (state: FeatureState) => state.categories;
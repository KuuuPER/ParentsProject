import * as fromInfos from './info.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface FeatureState{
    infos: fromInfos.State,
}

export const reducer: ActionReducerMap<FeatureState> = {
    infos: fromInfos.reducer,
};

export const getInfos = (state: FeatureState) => state.infos;
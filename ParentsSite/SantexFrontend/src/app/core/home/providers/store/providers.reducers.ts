import * as Actions from './providers.actions';
import { ProviderModel } from '../src/ProviderModel';

import * as fromApp from '../../../../store/app.reducers';
import { PageInfo } from '../../src/PageInfo';
import { INameId } from '../../src/INameId';

export interface FeatureState extends fromApp.AppState {
    providers: State;
}

export interface State{
    providers: ProviderModel[];
    pageInfo: PageInfo;
}

const initialState: State = {
    providers: [{Id: '1', Name: 'Поставщик 1'}, {Id: '2', Name: 'Поставщик 2'}, {Id: '3', Name: 'Поставщик 3'}],
    pageInfo: new PageInfo(10, 3, 1)
}

export function providersReducer(state: State = initialState, action: Actions.ProviderActions){
    switch (action.type) {
        case Actions.SET_PROVIDERS:
        return {
            ...state,
            providers: [...(<ProviderModel[]>action.payload)]
        };
        case Actions.ADD_PROVIDER:
        if (state.providers.length < state.pageInfo.itemsPerPage) {
            return{
                ...state,
                providers: [
                    ...state.providers,
                    <ProviderModel>action.payload
                ]
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_PROVIDER:
        const payload = <{provider: ProviderModel, index: number}>action.payload;
        const providerToUpdate = {
            ...state.providers[payload.index],
            ...payload.provider
        };
        const providers = [...state.providers];
        providers[payload.index] = providerToUpdate;
        const newProviders = [...providers];
        return {
            ...state,
            providers: newProviders
        };
        case Actions.PREVIOUS_PAGE:
        case Actions.NEXT_PAGE:
        const newCurrentPage = <number>action.payload;
        return {
            ...state,
            currentPage: newCurrentPage
        };
        default:
            return state;
    }
}
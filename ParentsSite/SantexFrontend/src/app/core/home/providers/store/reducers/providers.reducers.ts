import * as Actions from '../providers.actions';
import { ProviderModel } from '../../src/ProviderModel';

import * as fromApp from '../../../../../store/app.reducers';
import { PageInfo } from '../../../src/PageInfo';
import { INameId } from '../../../src/INameId';
import { ContactModel } from '../../../purchases/src/ContactModel';

export interface FeatureState extends fromApp.AppState {
    providers: State;
}

export interface State{
    ids: string[],
    providers: {[id: string]: ProviderModel};
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: ['0', '1', '2'],
    providers: {'0': {id: '0', name: 'Поставщик 1', contacts: [], imports: []}, '1': {id: '1', name: 'Поставщик 2', contacts: [], imports: []}, '2': {id: '2', name: 'Поставщик 3', contacts: [], imports: []}},
    pageInfo: new PageInfo(10, 3, 1)
}

export function providersReducer(state: State = initialState, action: Actions.ProviderActions){
    switch (action.type) {
        case Actions.SET_PROVIDERS:
        let newProviderModels: {[id:string]: ProviderModel} = {};
        (<ProviderModel[]>action.payload).forEach(pm => newProviderModels[pm.id] = pm);
        return {
            ...state,
            providers: {...newProviderModels}
        };
        case Actions.ADD_PROVIDER:
        if (Object.keys(state.providers).length < state.pageInfo.itemsPerPage) {
            const payload = <ProviderModel>action.payload;
            return{
                ...state,
                providers: {
                    ...state.providers,
                    payload
                }
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.DELETE_PROVIDER:
        const id = <string>action.payload; 
        const oldState = {...state};
        const ids = [...state.ids.filter(i => i !== id)];
        delete oldState.providers[id];
        return {
            ...state,
            providers: {...oldState.providers},
            ids: [...ids]
        }
        case Actions.EDIT_PROVIDER:
        const payload = <{provider: ProviderModel, id: string}>action.payload;
        const providerToUpdate = {
            ...state.providers[payload.id],
            ...payload.provider
        };
        const providers = {...state.providers};
        providers[payload.id] = providerToUpdate;
        const newProviders = {...providers};
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

export const getProviders = (state: State) => state.providers;
export const getIds = (state: State) => state.ids;
export const getPageInfo = (state: State) => state.pageInfo;
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
    editProvider: ProviderModel;
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: [],
    providers: {},
    editProvider: null,
    pageInfo: null
}

export function providersReducer(state: State = initialState, action: Actions.ProviderActions):State{
    switch (action.type) {
        case Actions.SET_PROVIDERS:
        const payloads = <ProviderModel[]>action.payload;
        const fetchedProviders: {[id: string]: ProviderModel} = {};
        const idsArray = [];
        payloads.forEach(p => {fetchedProviders[p.id] = p});
        payloads.forEach(p => idsArray.push(p.id));
        return {
            ...state,
            ids: [...idsArray],
            providers: {...fetchedProviders}
        };
        case Actions.SET_EDIT_PROVIDER:
        const provider = <ProviderModel>action.payload;
        return {
            ...state,
            editProvider: {...provider}
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
        case  Actions.SET_PAGEINFO:
        const pageInfo = <PageInfo>action.payload;
        const newPageInfo = new PageInfo(pageInfo.itemsPerPage, pageInfo.itemsCount, pageInfo.currentPage);
        return <State>{
            ...state,
            pageInfo: newPageInfo
        };
        case Actions.CHANGE_PAGE:
        const newCurrentPage = <number>action.payload;
        return {
            ...state,
            pageInfo: <PageInfo>{
                ...state.pageInfo,
                currentPage: newCurrentPage
            }
        };
        default:
            return state;
    }
}

export const getProviders = (state: State) => state.providers;
export const getEditProvider = (state: State) => state.editProvider;
export const getIds = (state: State) => state.ids;
export const getPageInfo = (state: State) => state.pageInfo;
import * as Actions from '../manufactures.actions';
import { ManufactureModel } from '../../src/ManufactureModel';

import * as fromApp from '../../../../../store/app.reducers';
import { PageInfo } from '../../../src/PageInfo';
import { INameId } from '../../../src/INameId';

export interface FeatureState extends fromApp.AppState {
    manufactures: State;
}

export interface State{
    ids: string[],
    manufactures: {[id: string]: ManufactureModel};    
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: ['0', '1', '2'],
    manufactures: {'0': {id: '0', name: 'Производитель 1', country: 'Россия', description: ''}, '1': {id: '1', name: 'Производитель 2', country: 'Россия', description: ''}, '2': {id: '2', name: 'Производитель 3', country: 'Россия', description: ''}},
    pageInfo: new PageInfo(10, 3, 1)
}

export function manufacturesReducer(state: State = initialState, action: Actions.ManufactureActions){
    switch (action.type) {
        case Actions.SET_MANUFACTURES:
        let manufactureModels: {[id: number]: ManufactureModel} = {};
        (<ManufactureModel[]>action.payload).forEach(m => manufactureModels[m.id] = m);
        return {
            ...state,
            manufactures: manufactureModels
        };
        case Actions.ADD_MANUFACTURE:
        if (Object.keys(state.manufactures).length < state.pageInfo.itemsPerPage) {
            const newManufacture: {[id: number]: ManufactureModel} = {};
            const payload = <ManufactureModel>action.payload;
            newManufacture[payload.id] = payload;
            return{
                ...state,
                manufactures: {
                    ...state.manufactures,
                    ...newManufacture
                }
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_MANUFACTURE:
        const payload = <{manufacture: ManufactureModel, id: string}>action.payload;
        const manufactureToUpdate = {
            ...state.manufactures[payload.id],
            ...payload.manufacture
        };
        const manufactures = {...state.manufactures};
        manufactures[payload.id] = manufactureToUpdate;
        const newManufactures = {...manufactures};
        return {
            ...state,
            manufactures: newManufactures
        };
        case Actions.DELETE_MANUFACTURE:
        const id = <string>action.payload;
        const oldState = {...state};
        delete oldState.manufactures[id];
        const ids = oldState.ids.filter(i => i !== id);
        return {
            ...state,
            ids: [...ids],
            manufactures: {...oldState.manufactures},
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

export const getManufactures = (state: State) => state.manufactures;
export const getIds = (state: State) => state.ids;
export const getPageInfo = (state: State) => state.pageInfo;
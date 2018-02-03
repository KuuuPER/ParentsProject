import * as Actions from './manufactures.actions';
import { ManufactureModel } from '../src/ManufactureModel';

import * as fromApp from '../../../../store/app.reducers';
import { PageInfo } from '../../src/PageInfo';
import { INameId } from '../../src/INameId';

export interface FeatureState extends fromApp.AppState {
    manufactures: State;
}

export interface State{
    manufactures: ManufactureModel[];    
    pageInfo: PageInfo;
}

const initialState: State = {
    manufactures: [{Id: '1', Name: 'Производитель 1'}, {Id: '2', Name: 'Производитель 2'}, {Id: '3', Name: 'Производитель 3'}],
    pageInfo: new PageInfo(10, 3, 1)
}

export function manufacturesReducer(state: State = initialState, action: Actions.ManufactureActions){
    switch (action.type) {
        case Actions.SET_MANUFACTURES:
        return {
            ...state,
            manufactures: [...(<ManufactureModel[]>action.payload)]
        };
        case Actions.ADD_MANUFACTURE:
        if (state.manufactures.length < state.pageInfo.itemsPerPage) {
            return{
                ...state,
                manufactures: [
                    ...state.manufactures,
                    <ManufactureModel>action.payload
                ]
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_MANUFACTURE:
        const payload = <{manufacture: ManufactureModel, index: number}>action.payload;
        const manufactureToUpdate = {
            ...state.manufactures[payload.index],
            ...payload.manufacture
        };
        const manufactures = [...state.manufactures];
        manufactures[payload.index] = manufactureToUpdate;
        const newManufactures = [...manufactures];
        return {
            ...state,
            manufactures: newManufactures
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
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
    editedManufacture: ManufactureModel;
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: [],
    manufactures: {},
    editedManufacture: null,
    pageInfo: null
}

export function manufacturesReducer(state: State = initialState, action: Actions.ManufactureActions): State{
    switch (action.type) {
        case Actions.SET_MANUFACTURES:
        const payloads = <ManufactureModel[]>action.payload;
        const fetchedManufactures: {[id: string]: ManufactureModel} = {};
        const idsArray = [];
        payloads.forEach(p => {fetchedManufactures[p.id] = p});
        payloads.forEach(p => idsArray.push(p.id));
        return {
            ...state,
            ids: [...idsArray],
            manufactures: {...fetchedManufactures}
        };
        case Actions.SET_EDIT_MANUFACTURE:
        const manufacture = <ManufactureModel>action.payload;
        return {
            ...state,
            editedManufacture: {...manufacture}
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

export const getManufactures = (state: State) => state.manufactures;
export const getIds = (state: State) => state.ids;
export const getEditManufacture = (state: State) => state.editedManufacture;
export const getPageInfo = (state: State) => state.pageInfo;
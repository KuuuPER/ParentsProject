import * as Actions from '../imports.actions';
import { ImportModel } from '../../src/ImportModel';

import * as fromApp from '../../../../../store/app.reducers';
import * as fromProducts from '../../../products/store/reducers/products.reducers';
import { PageInfo } from '../../../src/PageInfo';
import { INameId } from '../../../src/INameId';
import { ProviderModel } from '../../../providers/src/ProviderModel';
import { ProductModel } from '../../../products/src/ProductModel';
import { ImportStatus } from '../../src/ImportStatus';

export interface State{
    ids: string[],
    imports: {[id: string]: ImportModel};
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: ['0'],
    imports: {
        '0':
        new ImportModel(
            '0',
            {name: 'Поставщик 1', id: '1'},
            [new ProductModel('1', 'Продукт 1', '123456', { id: '1', name: 'Категория 1'}, { id: '1', name: 'Производитель 1' }, { id: '1', name: 'Поставщик 1' }, 1, 1000, 1300)],
            new Date(2018, 2, 25),
            new Date(2018, 2, 26),
            null,
            ImportStatus.InProgress
        )},
    pageInfo: new PageInfo(10, 3, 1)
}

export function importsReducer(state: State = initialState, action: Actions.ImportActions){
    switch (action.type) {
        case Actions.SET_IMPORTS:
        let importModels: {[id: string]: ImportModel} = {};
        (<ImportModel[]>action.payload).forEach(im => importModels[im.id] = im);
        return {
            ...state,
            imports: importModels
        };
        case Actions.ADD_IMPORT:
        if (Object.keys(state.imports).length < state.pageInfo.itemsPerPage) {
            const payload = <ImportModel>action.payload;
            let newImports: {[id: string]: ImportModel} = {...state.imports};
            newImports[payload.id] = payload; 
            return{
                ...state,
                imports: {
                    ...newImports
                }
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_IMPORT:
        const payload = <{import: ImportModel, id: string}>action.payload;
        const importToUpdate = {
            ...state.imports[payload.id],
            ...payload.import
        };
        const imports = {...state.imports};
        imports[payload.id] = <ImportModel>importToUpdate;
        return {
            ...state,
            imports: {...imports}
        };
        case Actions.DELETE_IMPORT:
        const id = <string>action.payload;
        const oldState = {...state};
        delete oldState.imports[id];
        const ids = oldState.ids.filter(i => i !== id);
        return {
            ...state,
            ids: [...ids],
            categories: {...oldState.imports},
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

export const getImports = (state: State) => state.imports;
export const getIds = (state: State) => state.ids;
export const getPageInfo = (state: State) => state.pageInfo;
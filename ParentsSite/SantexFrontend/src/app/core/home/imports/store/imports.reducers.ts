import * as Actions from './imports.actions';
import { ImportModel } from '../src/ImportModel';

import * as fromApp from '../../../../store/app.reducers';
import * as fromProducts from '../../products/store/products.reducers';
import { PageInfo } from '../../src/PageInfo';
import { INameId } from '../../src/INameId';
import { ProviderModel } from '../../providers/src/ProviderModel';
import { ProductModel } from '../../products/src/ProductModel';
import { ImportStatus } from '../src/ImportStatus';

export interface FeatureState extends fromProducts.FeatureState {
    imports: State;
}

export interface State{
    imports: ImportModel[];
    providers: INameId[];
    pageInfo: PageInfo;
}

const initialState: State = {
    imports: [
        new ImportModel(
            '1',
            new ProviderModel('Поставщик 1', '1'),
            [new ProductModel('1', 'Продукт 1', '123456', { Id: '1', Name: 'Категория 1'}, { Id: '1', Name: 'Производитель 1' }, { Id: '1', Name: 'Поставщик 1' }, 1, 1000, 1300)],
            new Date(2018, 2, 25),
            new Date(2018, 2, 26),
            null,
            ImportStatus.InProgress
        )],
    providers: [{Id: '1', Name: 'Поставщик 1'}, {Id: '2', Name: 'Поставщик 2'}, {Id: '3', Name: 'Поставщик 3'}],
    pageInfo: new PageInfo(10, 3, 1)
}

export function importsReducer(state: State = initialState, action: Actions.ImportActions){
    switch (action.type) {
        case Actions.SET_IMPORTS:
        return {
            ...state,
            imports: [...(<ImportModel[]>action.payload)]
        };
        case Actions.ADD_IMPORT:
        if (state.imports.length < state.pageInfo.itemsPerPage) {
            return{
                ...state,
                imports: [
                    ...state.imports,
                    <ImportModel>action.payload
                ]
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_IMPORT:
        const payload = <{import: ImportModel, index: number}>action.payload;
        const importToUpdate = {
            ...state.imports[payload.index],
            ...payload.import
        };
        const imports = [...state.imports];
        imports[payload.index] = <ImportModel>importToUpdate;
        const newImports = [...imports];
        return {
            ...state,
            imports: newImports
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
import * as Actions from '../categories.actions';
import { CategoryModel } from '../../src/CategoryModel';

import * as fromApp from '../../../../../store/app.reducers';
import { PageInfo } from '../../../src/PageInfo';
import { INameId } from '../../../src/INameId';

export interface FeatureState extends fromApp.AppState {
    categories: State;
}

export interface State{
    ids: string[],
    categories: { [id: string]: CategoryModel};
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: ['0', '1', '2'],
    categories: {'0': {id: '0', name: 'Категория 1'}, '1': {id: '1', name: 'Категория 2'}, '2': {id: '2', name: 'Категория 3'}},
    pageInfo: new PageInfo(10, 3, 1)
}

export function categoriesReducer(state: State = initialState, action: Actions.CategoryActions){
    switch (action.type) {
        case Actions.SET_CATEGORIES:
        let categoriesModels: {[id: string]: CategoryModel} = {};
        (<(CategoryModel[])>action.payload).forEach(cm => categories[cm.id] = cm);
        return {
            ...state,
            categories: categoriesModels
        };
        case Actions.ADD_CATEGORY:
        if (Object.keys(state.categories).length < state.pageInfo.itemsPerPage) {
            const payload = <CategoryModel>action.payload;
            let newCategory: {[id: string]: CategoryModel} = {};
            newCategory[payload.id] = payload;
            return{
                ...state,
                categories: {
                    ...state.categories,
                    ...newCategory
                }
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.DELETE_CATEGORY:
        const id = <string>action.payload;
        const oldState = {...state};
        delete oldState.categories[id];
        const ids = oldState.ids.filter(i => i !== id);
        return {
            ...state,
            ids: [...ids],
            categories: {...oldState.categories},
        };
        case Actions.EDIT_CATEGORY:
        const payload = <{category: CategoryModel, index: number}>action.payload;
        const categoryToUpdate = {
            ...state.categories[payload.index],
            ...payload.category
        };
        const categories = {...state.categories};
        categories[payload.index] = categoryToUpdate;
        const newCategories = {...categories};
        return {
            ...state,
            categories: newCategories
        };
        case Actions.PREVIOUS_PAGE:
        case Actions.NEXT_PAGE:
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

export const getCategories = (state: State) => state.categories;
export const getIds = (state: State) => state.ids;
export const getPageInfo = (state: State) => state.pageInfo;
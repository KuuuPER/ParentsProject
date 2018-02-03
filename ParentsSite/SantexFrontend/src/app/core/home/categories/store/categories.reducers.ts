import * as Actions from './categories.actions';
import { CategoryModel } from '../src/CategoryModel';

import * as fromApp from '../../../../store/app.reducers';
import { PageInfo } from '../../src/PageInfo';
import { INameId } from '../../src/INameId';

export interface FeatureState extends fromApp.AppState {
    categories: State;
}

export interface State{
    categories: CategoryModel[];    
    pageInfo: PageInfo;
}

const initialState: State = {
    categories: [{Id: '1', Name: 'Категория 1'}, {Id: '2', Name: 'Категория 2'}, {Id: '3', Name: 'Категория 3'}],
    pageInfo: new PageInfo(10, 3, 1)
}

export function categoriesReducer(state: State = initialState, action: Actions.CategoryActions){
    switch (action.type) {
        case Actions.SET_PROVIDERS:
        return {
            ...state,
            categories: [...(<CategoryModel[]>action.payload)]
        };
        case Actions.ADD_PROVIDER:
        if (state.categories.length < state.pageInfo.itemsPerPage) {
            return{
                ...state,
                categories: [
                    ...state.categories,
                    <CategoryModel>action.payload
                ]
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_PROVIDER:
        const payload = <{category: CategoryModel, index: number}>action.payload;
        const categoryToUpdate = {
            ...state.categories[payload.index],
            ...payload.category
        };
        const categories = [...state.categories];
        categories[payload.index] = categoryToUpdate;
        const newCategories = [...categories];
        return {
            ...state,
            categories: newCategories
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
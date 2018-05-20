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
    editedCategory: CategoryModel,
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: [],
    categories: {},
    editedCategory: null,
    pageInfo: null
}

export function categoriesReducer(state: State = initialState, action: Actions.CategoryActions){
    switch (action.type) {
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
        const payload = <{category: CategoryModel, id: string}>action.payload;
        const categoryToUpdate = {
            ...state.categories[payload.id],
            ...payload.category
        };
        const categories = {...state.categories};
        categories[payload.id] = categoryToUpdate;
        const newCategories = {...categories};
        return {
            ...state,
            categories: newCategories
        };
        case Actions.SET_CATEGORIES:
        const payloads = <CategoryModel[]>action.payload;
        const fetchedCategories: {[id: string]: CategoryModel} = {};
        const idsArray = [];
        payloads.forEach(p => {fetchedCategories[p.id] = p});
        payloads.forEach(p => idsArray.push(p.id));
        return {
            ...state,
            categories: {...fetchedCategories},
            ids: [...idsArray]
        };
        case Actions.SET_EDIT_CATEGORY:
        const category = <CategoryModel>action.payload;
        return {
            ...state,
            editedCategory: {...category}
        }
        case  Actions.SET_PAGEINFO:
        const pageInfo = <PageInfo>action.payload;
        const newPageInfo = new PageInfo(pageInfo.itemsPerPage, pageInfo.itemsCount, pageInfo.currentPage);
        return <State>{
            ...state,
            pageInfo: newPageInfo
        };
        case Actions.CHANGE_PAGE:
        const newCurrentPage = <number>action.payload;
        let newPage = new PageInfo(state.pageInfo.itemsPerPage, state.pageInfo.itemsCount, newCurrentPage);
        return {
            ...state,
            pageInfo: newPage
        };
        default:
            return state;
    }
}

export const getCategories = (state: State) => state.categories;
export const getEditCategory = (state: State) => state.editedCategory;
export const getIds = (state: State) => state.ids;
export const getPageInfo = (state: State) => state.pageInfo;
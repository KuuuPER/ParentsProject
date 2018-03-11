import { Action } from '@ngrx/store';
import { CategoryModel } from '../src/CategoryModel';
import { FetchProducts } from '../../products/store/products.actions';

export const FETCH_CATEGORIES: string = 'FETCH_CATEGORIES';
export const SET_CATEGORIES: string = 'SET_CATEGORIES';
export const ADD_CATEGORY: string = 'ADD_CATEGORY';
export const EDIT_CATEGORY: string = 'EDIT_CATEGORY';
export const DELETE_CATEGORY: string = 'DELETE_CATEGORY';
export const NEXT_PAGE: string = 'NEXT_PAGE';
export const PREVIOUS_PAGE: string = 'PREVIOUS_PAGE';

export class FetchCategories implements Action{
    readonly type: string = FETCH_CATEGORIES;

    constructor(public payload: number = 1){}
}

export class SetCategories implements Action{
    public readonly type: string = SET_CATEGORIES;

    constructor(public payload: CategoryModel[]){}
}

export class AddCategory implements Action{
    public readonly type: string = ADD_CATEGORY;

    constructor(public payload: CategoryModel){}
}

export class EditCategory implements Action{
    public readonly type: string = EDIT_CATEGORY;

    constructor(public payload: {category: CategoryModel, index: number}){}
}

export class DeleteCategory implements Action{
    public readonly type: string = DELETE_CATEGORY;

    constructor(public payload: string){}
}

export class NextPage implements Action{
    public readonly type: string = NEXT_PAGE;

    constructor(public payload: number){}
}

export class PreviousPage implements Action{
    public readonly type: string = PREVIOUS_PAGE;

    constructor(public payload: number){}
}

export type CategoryActions = SetCategories | FetchProducts | AddCategory | EditCategory | DeleteCategory | NextPage | PreviousPage;
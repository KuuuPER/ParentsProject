import { Action } from '@ngrx/store';
import { CategoryModel } from '../src/CategoryModel';
import { FetchProducts } from '../../products/store/products.actions';
import { PageInfo } from '../../src/PageInfo';

export const FETCH_CATEGORIES: string = 'FETCH_CATEGORIES';
export const SET_CATEGORIES: string = 'SET_CATEGORIES';
export const GET_CATEGORY: string = 'GET_CATEGORY';
export const SET_EDIT_CATEGORY: string = 'SET_EDIT_CATEGORY';
export const ADD_CATEGORY: string = 'ADD_CATEGORY';
export const EDIT_CATEGORY: string = 'EDIT_CATEGORY';
export const DELETE_CATEGORY: string = 'DELETE_CATEGORY';
export const SET_PAGEINFO: string = 'SET_PAGEINFO';
export const CHANGE_PAGE: string = 'CHANGE_PAGE';

export class FetchCategories implements Action{
    readonly type: string = FETCH_CATEGORIES;

    constructor(public payload: PageInfo = null){}
}

export class SetCategories implements Action{
    public readonly type: string = SET_CATEGORIES;

    constructor(public payload: CategoryModel[]){}
}

export class GetCategory implements Action{
    readonly type: string = GET_CATEGORY;

    constructor(public payload: string){}
}

export class SetEditCategory implements Action{
    readonly type: string = SET_EDIT_CATEGORY;

    constructor(public payload: CategoryModel){}
}

export class AddCategory implements Action{
    public readonly type: string = ADD_CATEGORY;

    constructor(public payload: CategoryModel){}
}

export class EditCategory implements Action{
    public readonly type: string = EDIT_CATEGORY;

    constructor(public payload: {category: CategoryModel, id: string}){}
}

export class DeleteCategory implements Action{
    public readonly type: string = DELETE_CATEGORY;

    constructor(public payload: string){}
}

export class SetPageInfo implements Action{
    readonly type: string = SET_PAGEINFO;

    constructor(public payload: PageInfo){}
}

export class ChangePage implements Action{
    readonly type: string = CHANGE_PAGE;

    constructor(public payload: number){}
}

export type CategoryActions = SetCategories | FetchProducts | SetEditCategory | AddCategory | EditCategory | DeleteCategory | ChangePage | SetPageInfo;
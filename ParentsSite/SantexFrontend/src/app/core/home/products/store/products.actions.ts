import { Action } from '@ngrx/store';
import { ProductModel } from '../src/ProductModel';
import { PageInfo } from '../../src/PageInfo';
import { FormGroup } from '@angular/forms';

export const FETCH_PRODUCTS: string = 'FETCH_PRODUCTS';
export const SET_PRODUCTS: string = 'SET_PRODUCTS';
export const GET_PRODUCT: string = 'GET_PRODUCT';
export const TAKE_PRODUCT: string = 'TAKE_PRODUCT';
export const ADD_PRODUCT: string = 'ADD_PRODUCT';
export const EDIT_PRODUCT: string = 'EDIT_PRODUCT';
export const DELETE_PRODUCT: string = 'DELETE_PRODUCT';
export const SET_PRODUCTS_COUNT: string = 'SET_PRODUCTS_COUNT';
export const INCREMENT_COUNT: string = 'INCREMENT_COUNT';
export const DECREMENT_COUNT: string = 'DECREMENT_COUNT';
export const EDIT_MODE: string = 'EDIT_MODE';
export const SET_FORM: string = 'SET_FORM';
export const CREATE_FORM: string = 'CREATE_FORM';
export const SET_PAGEINFO: string = 'SET_PAGEINFO';
export const NEXT_PAGE: string = 'NEXT_PAGE';
export const PREVIOUS_PAGE: string = 'PREVIOUS_PAGE';
export const SET_EDIT_PRODUCT: string = 'SET_EDIT_PRODUCT';
export const CHANGE_PAGE: string = 'CHANGE_PAGE';

export class FetchProducts implements Action{
    readonly type: string = FETCH_PRODUCTS;

    constructor(public payload: PageInfo = null){}
}

export class SetProducts implements Action{
    readonly type: string = SET_PRODUCTS;

    constructor(public payload: ProductModel[]){}
}

export class SetProductCount implements Action{
    readonly type: string = SET_PRODUCTS_COUNT;

    constructor(public payload: { count: number, id: string }){}
}

export class IncrementCount implements Action{
    readonly type: string = INCREMENT_COUNT;

    constructor(public payload: string){}
}

export class DecrementCount implements Action{
    readonly type: string = DECREMENT_COUNT;

    constructor(public payload: string){}
}

export class GetProduct implements Action{
    readonly type: string = GET_PRODUCT;

    constructor(public payload: string){}
}

export class TakeProduct implements Action{
    readonly type: string = TAKE_PRODUCT;

    constructor(public payload: ProductModel){}
}

export class AddProduct implements Action{
    readonly type: string = ADD_PRODUCT;

    constructor(public payload: ProductModel){}
}

export class EditProduct implements Action{
    readonly type: string = EDIT_PRODUCT;

    constructor(public payload: {product: ProductModel, id: string}){}
}

export class DeleteProduct implements Action{
    readonly type: string = DELETE_PRODUCT;

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

export class SetForm implements Action{
    readonly type: string = SET_FORM;

    constructor(public payload: ProductModel){}
}

export type ProductsActions = FetchProducts | SetProducts | SetProductCount | IncrementCount | DecrementCount | GetProduct | AddProduct | EditProduct | DeleteProduct | SetPageInfo | ChangePage;
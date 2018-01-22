import { Action } from '@ngrx/store';
import { ProductModel } from '../src/ProductModel';

export const FETCH_PRODUCTS: string = 'FETCH_PRODUCTS';
export const SET_PRODUCTS: string = 'SET_PRODUCTS';
export const ADD_PRODUCT: string = 'ADD_PRODUCT';
export const EDIT_PRODUCT: string = 'EDIT_PRODUCT';
export const DELETE_PRODUCT: string = 'DELETE_PRODUCT';
export const NEXT_PAGE: string = 'NEXT_PAGE';
export const PREVIOUS_PAGE: string = 'PREVIOUS_PAGE';

export class FetchProducts implements Action{
    readonly type: string = FETCH_PRODUCTS;

    constructor(public payload: number = 1){}
}

export class SetProducts implements Action{
    readonly type: string = SET_PRODUCTS;

    constructor(public payload: ProductModel[]){}
}

export class AddProduct implements Action{
    readonly type: string = ADD_PRODUCT;

    constructor(public payload: ProductModel){}
}

export class EditProduct implements Action{
    readonly type: string = EDIT_PRODUCT;

    constructor(public payload: {product: ProductModel, index: number}){}
}

export class DeleteProduct implements Action{
    readonly type: string = DELETE_PRODUCT;

    constructor(public payload: number){}
}

export class NextPage implements Action{
    readonly type: string = NEXT_PAGE;

    constructor(public payload: number){}
}

export class PreviousPage implements Action{
    readonly type: string = PREVIOUS_PAGE;

    constructor(public payload: number){}
}

export type ProductsActions = SetProducts | AddProduct | EditProduct | NextPage | PreviousPage;
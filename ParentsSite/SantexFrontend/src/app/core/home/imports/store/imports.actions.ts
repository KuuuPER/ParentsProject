import { Action } from '@ngrx/store';
import { ImportModel } from '../src/ImportModel';
import { FetchProducts } from '../../products/store/products.actions';
import { PageInfo } from '../../src/PageInfo';
import { ProductModel } from '../../products/src/ProductModel';

export const FETCH_IMPORTS: string = 'FETCH_IMPORTS';
export const FETCH_IMPORT_PRODUCTS: string = 'FETCH_IMPORT_PRODUCTS';
export const INCREMENT_IMPORT_PRODUCT: string = 'INCREMENT_IMPORT_PRODUCT';
export const DECREMENT_IMPORT_PRODUCT: string = 'DECREMENT_IMPORT_PRODUCT';
export const ADD_IMPORT_PRODUCT: string = 'ADD_IMPORT_PRODUCT';
export const DELETE_IMPORT_PRODUCT: string = 'DELETE_IMPORT_PRODUCT';
export const SET_IMPORT_PRODUCTS: string = 'SET_IMPORT_PRODUCTS';
export const CLEAR_IMPORT_PRODUCTS: string = 'CLEAR_IMPORT_PRODUCTS';
export const SET_PRODUCTS_PAGEINFO: string = 'SET_PRODUCTS_PAGEINFO';
export const GET_IMPORT: string = 'GET_IMPORT';
export const SET_EDIT_IMPORT: string = 'SET_EDIT_IMPORT';
export const SET_IMPORTS: string = 'SET_IMPORTS';
export const ADD_IMPORT: string = 'ADD_IMPORT';
export const EDIT_IMPORT: string = 'EDIT_IMPORT';
export const DELETE_IMPORT: string = 'DELETE_IMPORT';
export const SET_PAGEINFO: string = 'SET_PAGEINFO';
export const CHANGE_PAGE: string = 'CHANGE_PAGE';

export class FetchImports implements Action{
    readonly type: string = FETCH_IMPORTS;

    constructor(public payload: PageInfo = null){}
}

export class FetchImportProducts implements Action{
    readonly type: string = FETCH_IMPORT_PRODUCTS;

    constructor(public payload: {pageInfo: PageInfo, importId: string}){}
}

export class SetImport implements Action{
    public readonly type: string = SET_IMPORTS;

    constructor(public payload: ImportModel[]){}
}

export class SetImportProducts implements Action{
    public readonly type: string = SET_IMPORT_PRODUCTS;

    constructor(public payload: ProductModel[]){}
}

export class ClearImportProducts implements Action{
    public readonly type: string = CLEAR_IMPORT_PRODUCTS;

    constructor(public payload: {}){}
}

export class AddProduct implements Action{
    public readonly type: string = ADD_IMPORT_PRODUCT;

    constructor(public payload: ProductModel){}
}

export class DeleteProduct implements Action{
    public readonly type: string = DELETE_IMPORT_PRODUCT;

    constructor(public payload: string){}
}

export class IncrementProduct implements Action{
    public readonly type: string = INCREMENT_IMPORT_PRODUCT;

    constructor(public payload: string){}
}

export class DecrementProduct implements Action{
    public readonly type: string = DECREMENT_IMPORT_PRODUCT;

    constructor(public payload: string){}
}

export class SetProductsPageInfo implements Action{
    public readonly type: string = SET_PRODUCTS_PAGEINFO;

    constructor(public payload: PageInfo){}
}

export class GetImport implements Action{
    readonly type: string = GET_IMPORT;

    constructor(public payload: string){}
}

export class SetImports implements Action{
    readonly type: string = SET_IMPORTS;

    constructor(public payload: ImportModel[]){}
}

export class SetEditImport implements Action{
    readonly type: string = SET_EDIT_IMPORT;

    constructor(public payload: ImportModel){}
}

export class AddImport implements Action{
    readonly type: string = ADD_IMPORT;

    constructor(public payload: ImportModel){}
}

export class EditImport implements Action{
    readonly type: string = EDIT_IMPORT;

    constructor(public payload: {import: ImportModel, id: string}){}
}

export class DeleteImport implements Action{
    readonly type: string = DELETE_IMPORT;

    constructor(public payload: string){}
}

export class SetPageInfo implements Action{
    readonly type: string = SET_PAGEINFO;

    constructor(public payload: number){}
}

export class ChangePage implements Action{
    readonly type: string = CHANGE_PAGE;

    constructor(public payload: number){}
}

export type ImportActions = SetImports | FetchImportProducts | AddProduct | DeleteProduct | IncrementProduct | DecrementProduct | SetImportProducts | ClearImportProducts | SetProductsPageInfo | SetEditImport | AddImport | EditImport | DeleteImport | SetPageInfo | ChangePage;
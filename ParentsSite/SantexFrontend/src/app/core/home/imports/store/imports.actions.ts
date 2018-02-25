import { Action } from '@ngrx/store';
import { ImportModel } from '../src/ImportModel';
import { FetchProducts } from '../../products/store/products.actions';

export const FETCH_IMPORTS: string = 'FETCH_IMPORTS';
export const SET_IMPORTS: string = 'SET_IMPORTS';
export const ADD_IMPORT: string = 'ADD_IMPORT';
export const EDIT_IMPORT: string = 'EDIT_IMPORT';
export const DELETE_IMPORT: string = 'DELETE_IMPORT';
export const NEXT_PAGE: string = 'NEXT_PAGE';
export const PREVIOUS_PAGE: string = 'PREVIOUS_PAGE';

export class FetchImports implements Action{
    readonly type: string = FETCH_IMPORTS;

    constructor(public payload: number = 1){}
}

export class SetImports implements Action{
    readonly type: string = SET_IMPORTS;

    constructor(public payload: ImportModel[]){}
}

export class AddImport implements Action{
    readonly type: string = ADD_IMPORT;

    constructor(public payload: ImportModel){}
}

export class EditImport implements Action{
    readonly type: string = EDIT_IMPORT;

    constructor(public payload: {import: ImportModel, index: number}){}
}

export class DeleteImport implements Action{
    readonly type: string = DELETE_IMPORT;

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

export type ImportActions = SetImports | FetchProducts | AddImport | EditImport | NextPage | PreviousPage;
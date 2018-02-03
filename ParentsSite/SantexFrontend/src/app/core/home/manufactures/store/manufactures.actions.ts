import { Action } from '@ngrx/store';
import { ManufactureModel } from '../src/ManufactureModel';
import { FetchProducts } from '../../products/store/products.actions';

export const FETCH_MANUFACTURES: string = 'FETCH_MANUFACTURES';
export const SET_MANUFACTURES: string = 'SET_MANUFACTURES';
export const ADD_MANUFACTURE: string = 'ADD_MANUFACTURE';
export const EDIT_MANUFACTURE: string = 'EDIT_MANUFACTURE';
export const DELETE_MANUFACTURE: string = 'DELETE_MANUFACTURE';
export const NEXT_PAGE: string = 'NEXT_PAGE';
export const PREVIOUS_PAGE: string = 'PREVIOUS_PAGE';

export class FetchManufactures implements Action{
    readonly type: string = FETCH_MANUFACTURES;

    constructor(public payload: number = 1){}
}

export class SetManufactures implements Action{
    readonly type: string = SET_MANUFACTURES;

    constructor(public payload: ManufactureModel[]){}
}

export class AddManufacture implements Action{
    readonly type: string = ADD_MANUFACTURE;

    constructor(public payload: ManufactureModel){}
}

export class EditManufacture implements Action{
    readonly type: string = EDIT_MANUFACTURE;

    constructor(public payload: {manufacture: ManufactureModel, index: number}){}
}

export class DeleteManufacture implements Action{
    readonly type: string = DELETE_MANUFACTURE;

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

export type ManufactureActions = SetManufactures | FetchProducts | AddManufacture | EditManufacture | NextPage | PreviousPage;
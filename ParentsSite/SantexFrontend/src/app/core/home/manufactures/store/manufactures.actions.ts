import { Action } from '@ngrx/store';
import { ManufactureModel } from '../src/ManufactureModel';
import { FetchProducts } from '../../products/store/products.actions';
import { PageInfo } from '../../src/PageInfo';

export const FETCH_MANUFACTURES: string = 'FETCH_MANUFACTURES';
export const SET_MANUFACTURES: string = 'SET_MANUFACTURES';
export const GET_MANUFACTURE: string = 'GET_MANUFACTURE';
export const SET_EDIT_MANUFACTURE: string = 'SET_EDIT_MANUFACTURE';
export const ADD_MANUFACTURE: string = 'ADD_MANUFACTURE';
export const EDIT_MANUFACTURE: string = 'EDIT_MANUFACTURE';
export const DELETE_MANUFACTURE: string = 'DELETE_MANUFACTURE';
export const SET_PAGEINFO: string = 'SET_PAGEINFO';
export const CHANGE_PAGE: string = 'CHANGE_PAGE';

export class FetchManufactures implements Action{
    readonly type: string = FETCH_MANUFACTURES;

    constructor(public payload: PageInfo = null){}
}

export class GetManufacture implements Action{
    readonly type: string = GET_MANUFACTURE;

    constructor(public payload: string){}
}

export class SetEditManufacture implements Action{
    readonly type: string = SET_EDIT_MANUFACTURE;

    constructor(public payload: ManufactureModel){}
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

    constructor(public payload: {manufacture: ManufactureModel, id: string}){}
}

export class DeleteManufacture implements Action{
    readonly type: string = DELETE_MANUFACTURE;

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

export type ManufactureActions = SetManufactures | FetchProducts | GetManufacture | AddManufacture | EditManufacture | DeleteManufacture | ChangePage | SetPageInfo;
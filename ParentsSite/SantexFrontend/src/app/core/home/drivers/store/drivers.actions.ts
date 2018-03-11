import { Action } from '@ngrx/store';
import { DriverModel } from '../src/DriverModel';
import { FetchProducts } from '../../products/store/products.actions';

export const FETCH_DRIVERS: string = 'FETCH_DRIVERS';
export const SET_DRIVERS: string = 'SET_DRIVERS';
export const ADD_DRIVER: string = 'ADD_DRIVER';
export const EDIT_DRIVER: string = 'EDIT_DRIVER';
export const DELETE_DRIVER: string = 'DELETE_DRIVER';
export const NEXT_PAGE: string = 'NEXT_PAGE';
export const PREVIOUS_PAGE: string = 'PREVIOUS_PAGE';

export class FetchDrivers implements Action{
    public readonly type: string = FETCH_DRIVERS;

    constructor(public payload: number = 1){}
}

export class SetDrivers implements Action{
    public readonly type: string = SET_DRIVERS;

    constructor(public payload: DriverModel[]){}
}

export class AddDriver implements Action{
    public readonly type: string = ADD_DRIVER;

    constructor(public payload: DriverModel){}
}

export class EditDriver implements Action{
    public readonly type: string = EDIT_DRIVER;

    constructor(public payload: {driver: DriverModel, id: string}){}
}

export class DeleteDriver implements Action{
    public readonly type: string = DELETE_DRIVER;

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

export type DriverActions = SetDrivers | FetchProducts | AddDriver | EditDriver | DeleteDriver | NextPage | PreviousPage;
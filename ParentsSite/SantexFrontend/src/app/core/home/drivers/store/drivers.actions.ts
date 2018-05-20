import { Action } from '@ngrx/store';
import { DriverModel } from '../src/DriverModel';
import { PageInfo } from '../../src/PageInfo';

export const FETCH_DRIVERS: string = 'FETCH_DRIVERS';
export const SET_DRIVERS: string = 'SET_DRIVERS';
export const ADD_DRIVER: string = 'ADD_DRIVER';
export const GET_DRIVER: string = 'GET_DRIVER';
export const SET_EDIT_DRIVER: string = 'SET_EDIT_DRIVER';
export const EDIT_DRIVER: string = 'EDIT_DRIVER';
export const DELETE_DRIVER: string = 'DELETE_DRIVER';
export const FETCH_DELIVERIES: string = 'FETCH_DELIVERIES';
export const SET_DELIVERIES: string = 'SET_DELIVERIES';
export const SET_PAGEINFO: string = 'SET_PAGEINFO';
export const CHANGE_PAGE: string = 'CHANGE_PAGE';

export class FetchDrivers implements Action{
    public readonly type: string = FETCH_DRIVERS;

    constructor(public payload: PageInfo = null){}
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

export class GetDriver implements Action{
    public readonly type: string = GET_DRIVER;

    constructor(public payload: string){}
}

export class DeleteDriver implements Action{
    public readonly type: string = DELETE_DRIVER;

    constructor(public payload: string){}
}

export class SetPageInfo implements Action{
    public readonly type: string = SET_PAGEINFO;

    constructor(public payload: PageInfo){}
}

export class ChangePage implements Action{
    public readonly type: string = CHANGE_PAGE;

    constructor(public payload: number){}
}

export class FetchDeliveries implements Action{
    public readonly type: string = FETCH_DELIVERIES;

    constructor(public payload: PageInfo){}
}

export class SetDeliveries implements Action{
    public readonly type: string = SET_DELIVERIES;

    constructor(public payload: PageInfo){}
}

export type DriverActions = SetDrivers | GetDriver | FetchDeliveries | AddDriver | EditDriver | DeleteDriver | SetPageInfo | ChangePage;
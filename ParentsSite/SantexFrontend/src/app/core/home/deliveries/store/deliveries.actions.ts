import { Action } from '@ngrx/store';
import { DeliveryModel } from '../src/DeliveryModel';

export const FETCH_DELIVERIES: string = 'FETCH_DELIVERIES';
export const SET_DELIVERIES: string = 'SET_DELIVERIES';
export const ADD_DELIVERY: string = 'ADD_DELIVERY';
export const EDIT_DELIVERY: string = 'EDIT_DELIVERY';
export const DELETE_DELIVERY: string = 'DELETE_DELIVERY';
export const NEXT_PAGE: string = 'NEXT_PAGE';
export const PREVIOUS_PAGE: string = 'PREVIOUS_PAGE';

export class FetchDeliveries implements Action{
    readonly type: string = FETCH_DELIVERIES;

    constructor(public payload: number = 1){}
}

export class SetDeliveries implements Action{
    readonly type: string = SET_DELIVERIES;

    constructor(public payload: DeliveryModel[]){}
}

export class AddDelivery implements Action{
    readonly type: string = ADD_DELIVERY;

    constructor(public payload: DeliveryModel){}
}

export class EditDelivery implements Action{
    readonly type: string = EDIT_DELIVERY;

    constructor(public payload: {delivery: DeliveryModel, index: number}){}
}

export class DeleteDelivery implements Action{
    readonly type: string = DELETE_DELIVERY;

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

export type DeliveriesActions = SetDeliveries | AddDelivery | EditDelivery | NextPage | PreviousPage;
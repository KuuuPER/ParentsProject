import { Action } from '@ngrx/store';
import { DeliveryModel } from '../src/DeliveryModel';
import { PageInfo } from '../../src/PageInfo';
import { PurchaseUnitModel } from '../../src/PurchaseUnit';
import { DeliveryPurchaseModel } from '../src/DeliveryPurchaseModel';

export const FETCH_DELIVERIES: string = 'FETCH_DELIVERIES';
export const SET_DELIVERIES: string = 'SET_DELIVERIES';
export const GET_DELIVERY: string = 'GET_DELIVERY';
export const SET_EDIT_DELIVERY: string = 'SET_EDIT_DELIVERY';
export const ADD_DELIVERY: string = 'ADD_DELIVERY';
export const EDIT_DELIVERY: string = 'EDIT_DELIVERY';
export const DELETE_DELIVERY: string = 'DELETE_DELIVERY';
export const GET_DELIVERY_PURCHASES: string = 'GET_DELIVERY_PURCHASES';
export const SET_DELIVERY_PURCHASES: string = 'SET_DELIVERY_PURCHASES';
export const ADD_PURCHASE_UNIT: string = 'ADD_PURCHASE_UNIT';
export const CLEAR_PURCHASE_UNITS: string = 'CLEAR_PURCHASE_UNITS';
export const DELETE_PURCHASE_UNIT: string = 'DELETE_PURCHASE_UNIT';
export const SET_PAGEINFO: string = 'SET_PAGEINFO';
export const CHANGE_PAGE: string = 'CHANGE_PAGE';

export class FetchDeliveries implements Action{
    readonly type: string = FETCH_DELIVERIES;

    constructor(public payload: PageInfo = null){}
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

    constructor(public payload: {delivery: DeliveryModel, id: string}){}
}

export class DeleteDelivery implements Action{
    readonly type: string = DELETE_DELIVERY;

    constructor(public payload: string){}
}

export class GetDelivery implements Action{
    readonly type: string = GET_DELIVERY;

    constructor(public payload: string) { }
}

export class SetEditDelivery implements Action{
    readonly type: string = SET_EDIT_DELIVERY;

    constructor(public payload: DeliveryModel) { }
}

export class GetPurchases implements Action{
    readonly type: string = GET_DELIVERY_PURCHASES;

    constructor(public payload: string = null) { }
}

export class SetPurchases implements Action{
    readonly type: string = SET_DELIVERY_PURCHASES;

    constructor(public payload: DeliveryPurchaseModel[]) { }
}

export class AddPurchaseUnit implements Action{
    readonly type: string = ADD_PURCHASE_UNIT;

    constructor(public payload: {unit: PurchaseUnitModel, purchaseId: string}) { }
}

export class DeletePurchaseUnit implements Action{
    readonly type: string = DELETE_PURCHASE_UNIT;

    constructor(public payload: {purchaseUnitId: string}) { }
}

export class ClearPurchaseUnits implements Action{
    readonly type: string = CLEAR_PURCHASE_UNITS;

    constructor(public payload = null) { }
}

export class SetPageInfo implements Action{
    readonly type: string = SET_PAGEINFO;

    constructor(public payload: PageInfo){}
}

export class ChangePage implements Action{
    readonly type: string = CHANGE_PAGE;

    constructor(public payload: number){}
}

export type DeliveriesActions = SetDeliveries | AddDelivery | EditDelivery | SetEditDelivery | SetPurchases | AddPurchaseUnit | DeletePurchaseUnit | ClearPurchaseUnits | DeleteDelivery | SetPageInfo | ChangePage;
import { Action } from '@ngrx/store';
import { PurchaseModel } from '../src/PurchaseModel';
import { PageInfo } from '../../src/PageInfo';
import { PurchaseUnitModel } from '../../src/PurchaseUnit';
import { PurchaseDeliveryModel } from '../src/PurchaseDeliveryModel';

export const FETCH_PURCHASES: string = 'FETCH_PURCHASES';
export const SET_PURCHASES: string = 'SET_PURCHASES';
export const ADD_PURCHASE: string = 'ADD_PURCHASE';
export const GET_PURCHASE: string = 'GET_PURCHASE';
export const GET_PURCHASE_DELIVERIES: string = 'GET_PURCHASE_DELIVERIES';
export const SET_PURCHASE_DELIVERIES: string = 'SET_PURCHASE_DELIVERIES';
export const FETCH_PURCHASE_UNITS: string = 'FETCH_PURCHASE_UNITS';
export const SET_PURCHASE_UNITS: string = 'SET_PURCHASE_UNITS';
export const ADD_UNIT_TO_PURCHASE: string = 'ADD_UNIT_TO_PURCHASE';
export const CLEAR_PURCHASE_UNITS: string = 'CLEAR_PURCHASE_UNITS';
export const DELETE_UNIT_FROM_PURCHASE: string = 'DELETE_UNIT_FROM_PURCHASE';
export const EDIT_PURCHASE: string = 'EDIT_PURCHASE';
export const SET_EDIT_PURCHASE: string = 'SET_EDIT_PURCHASE';
export const DELETE_PURCHASE: string = 'DELETE_PURCHASE';
export const SET_PAGEINFO: string = 'SET_PAGEINFO';
export const CHANGE_PAGE: string = 'CHANGE_PAGE';

export class FetchPurchases implements Action{
    readonly type: string = FETCH_PURCHASES;

    constructor(public payload: PageInfo = null){}
}

export class SetPurchases implements Action{
    readonly type: string = SET_PURCHASES;

    constructor(public payload: PurchaseModel[]){}
}

export class AddPurchase implements Action{
    readonly type: string = ADD_PURCHASE;

    constructor(public payload: PurchaseModel){}
}

export class EditPurchase implements Action{
    readonly type: string = EDIT_PURCHASE;

    constructor(public payload: {purchase: PurchaseModel, id: string}){}
}

export class FetchPurchaseProducts implements Action{
    readonly type: string = FETCH_PURCHASE_UNITS;

    constructor(public payload: string) { }
}

export class SetPurchaseProducts implements Action{
    readonly type: string = SET_PURCHASE_UNITS;

    constructor(public payload: PurchaseUnitModel[]) { }
}

export class AddPurchaseUnit implements Action{
    public readonly type: string = ADD_UNIT_TO_PURCHASE;

    constructor(public payload: PurchaseUnitModel){}
}

export class DeletePurchaseUnit implements Action{
    public readonly type: string = DELETE_UNIT_FROM_PURCHASE;

    constructor(public payload: string){}
}

export class ClearPurchaseUnits implements Action{
    public readonly type: string = CLEAR_PURCHASE_UNITS;

    constructor(public payload: {}) { }
}

export class GetPurchase implements Action{
    readonly type: string = GET_PURCHASE;

    constructor(public payload: string){}
}

export class SetEditPurchase implements Action{
    readonly type: string = SET_EDIT_PURCHASE;

    constructor(public payload: PurchaseModel){}
}

export class DeletePurchase implements Action{
    readonly type: string = DELETE_PURCHASE;

    constructor(public payload: string){}
}

export class GetDeliveries implements Action{
    readonly type: string = GET_PURCHASE_DELIVERIES;

    constructor(public payload: PageInfo = null){}
}

export class SetDeliveries implements Action{
    readonly type: string = SET_PURCHASE_DELIVERIES;

    constructor(public payload: PurchaseDeliveryModel[]){}
}

export class SetPage implements Action{
    readonly type: string = SET_PAGEINFO;

    constructor(public payload: PageInfo){}
}

export class ChangePage implements Action{
    readonly type: string = CHANGE_PAGE;

    constructor(public payload: number){}
}

export type PurchasesActions = SetPurchases | AddPurchase | EditPurchase | SetEditPurchase | SetPurchaseProducts | DeletePurchase | AddPurchaseUnit | DeletePurchaseUnit | SetDeliveries | SetPage | ChangePage;
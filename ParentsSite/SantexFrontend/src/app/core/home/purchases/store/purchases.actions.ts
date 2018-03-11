import { Action } from '@ngrx/store';
import { PurchaseModel } from '../src/PurchaseModel';

export const FETCH_PURCHASES: string = 'FETCH_PURCHASES';
export const SET_PURCHASES: string = 'SET_PURCHASES';
export const ADD_PURCHASE: string = 'ADD_PURCHASE';
export const EDIT_PURCHASE: string = 'EDIT_PURCHASE';
export const DELETE_PURCHASE: string = 'DELETE_PURCHASE';
export const NEXT_PAGE: string = 'NEXT_PAGE';
export const PREVIOUS_PAGE: string = 'PREVIOUS_PAGE';

export class FetchPurchases implements Action{
    readonly type: string = FETCH_PURCHASES;

    constructor(public payload: number = 1){}
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

export class DeletePurchase implements Action{
    readonly type: string = DELETE_PURCHASE;

    constructor(public payload: string){}
}

export class NextPage implements Action{
    readonly type: string = NEXT_PAGE;

    constructor(public payload: number){}
}

export class PreviousPage implements Action{
    readonly type: string = PREVIOUS_PAGE;

    constructor(public payload: number){}
}

export type PurchasesActions = SetPurchases | AddPurchase | EditPurchase | DeletePurchase | NextPage | PreviousPage;
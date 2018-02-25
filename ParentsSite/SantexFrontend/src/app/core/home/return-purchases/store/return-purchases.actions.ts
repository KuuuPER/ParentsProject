import { Action } from '@ngrx/store';
import { ReturnPurchaseModel } from '../src/ReturnPurchaseModel';

export const FETCH_RETURN_PURCHASES: string = 'FETCH_RETURN_PURCHASES';
export const SET_RETURN_PURCHASES: string = 'SET_RETURN_PURCHASES';
export const ADD_RETURN_PURCHASE: string = 'ADD_RETURN_PURCHASE';
export const EDIT_RETURN_PURCHASE: string = 'EDIT_RETURN_PURCHASE';
export const DELETE_RETURN_PURCHASE: string = 'DELETE_RETURN_PURCHASE';
export const NEXT_PAGE: string = 'NEXT_PAGE';
export const PREVIOUS_PAGE: string = 'PREVIOUS_PAGE';

export class FetchReturnPurchases implements Action{
    readonly type: string = FETCH_RETURN_PURCHASES;

    constructor(public payload: number = 1){}
}

export class SetReturnPurchases implements Action{
    readonly type: string = SET_RETURN_PURCHASES;

    constructor(public payload: ReturnPurchaseModel[]){}
}

export class AddReturnPurchase implements Action{
    readonly type: string = ADD_RETURN_PURCHASE;

    constructor(public payload: ReturnPurchaseModel){}
}

export class EditReturnPurchase implements Action{
    readonly type: string = EDIT_RETURN_PURCHASE;

    constructor(public payload: {returnPurchase: ReturnPurchaseModel, index: number}){}
}

export class DeleteReturnPurchase implements Action{
    readonly type: string = DELETE_RETURN_PURCHASE;

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

export type ReturnPurchasesActions = SetReturnPurchases | AddReturnPurchase | EditReturnPurchase | NextPage | PreviousPage;
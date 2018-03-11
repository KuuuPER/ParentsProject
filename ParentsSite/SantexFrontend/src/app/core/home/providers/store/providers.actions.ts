import { Action } from '@ngrx/store';
import { ProviderModel } from '../src/ProviderModel';
import { FetchProducts } from '../../products/store/products.actions';

export const FETCH_PROVIDERS: string = 'FETCH_PROVIDERS';
export const SET_PROVIDERS: string = 'SET_PROVIDERS';
export const ADD_PROVIDER: string = 'ADD_PROVIDER';
export const EDIT_PROVIDER: string = 'EDIT_PROVIDER';
export const DELETE_PROVIDER: string = 'DELETE_PROVIDER';
export const NEXT_PAGE: string = 'NEXT_PAGE';
export const PREVIOUS_PAGE: string = 'PREVIOUS_PAGE';

export class FetchProviders implements Action{
    readonly type: string = FETCH_PROVIDERS;

    constructor(public payload: number = 1){}
}

export class SetProviders implements Action{
    readonly type: string = SET_PROVIDERS;

    constructor(public payload: ProviderModel[]){}
}

export class AddProvider implements Action{
    readonly type: string = ADD_PROVIDER;

    constructor(public payload: ProviderModel){}
}

export class EditProvider implements Action{
    readonly type: string = EDIT_PROVIDER;

    constructor(public payload: {provider: ProviderModel, id: string}){}
}

export class DeleteProvider implements Action{
    readonly type: string = DELETE_PROVIDER;

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

export type ProviderActions = SetProviders | FetchProducts | AddProvider | EditProvider | DeleteProvider | NextPage | PreviousPage;
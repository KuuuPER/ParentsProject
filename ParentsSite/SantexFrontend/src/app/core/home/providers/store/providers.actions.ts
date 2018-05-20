import { Action } from '@ngrx/store';
import { ProviderModel } from '../src/ProviderModel';
import { PageInfo } from '../../src/PageInfo';

export const FETCH_PROVIDERS: string = 'FETCH_PROVIDERS';
export const GET_PROVIDER: string = 'GET_PROVIDER';
export const SET_PROVIDERS: string = 'SET_PROVIDERS';
export const SET_EDIT_PROVIDER: string = 'SET_EDIT_PROVIDER';
export const ADD_PROVIDER: string = 'ADD_PROVIDER';
export const EDIT_PROVIDER: string = 'EDIT_PROVIDER';
export const DELETE_PROVIDER: string = 'DELETE_PROVIDER';
export const SET_PAGEINFO: string = 'SET_PAGEINFO';
export const CHANGE_PAGE: string = 'CHANGE_PAGE';

export class FetchProviders implements Action{
    readonly type: string = FETCH_PROVIDERS;

    constructor(public payload: PageInfo = null){}
}

export class GetProvider implements Action{
    readonly type: string = GET_PROVIDER;

    constructor(public payload: string){}
}

export class SetProviders implements Action{
    readonly type: string = SET_PROVIDERS;

    constructor(public payload: ProviderModel[]){}
}

export class AddProvider implements Action{
    readonly type: string = ADD_PROVIDER;

    constructor(public payload: ProviderModel){}
}

export class SetEditProvider implements Action{
    readonly type: string = SET_EDIT_PROVIDER;

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

export class SetPageInfo implements Action{
    readonly type: string = SET_PAGEINFO;

    constructor(public payload: number){}
}

export class ChangePage implements Action{
    readonly type: string = CHANGE_PAGE;

    constructor(public payload: number){}
}

export type ProviderActions = SetProviders | FetchProviders | GetProvider | AddProvider | EditProvider | DeleteProvider | SetPageInfo | ChangePage;
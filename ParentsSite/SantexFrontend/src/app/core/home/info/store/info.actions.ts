import { Action } from '@ngrx/store';

import { InfoModel } from '../../src/InfoModel'

export const SHOW_INFO: string = 'SHOW_INFO';
export const SHOW_WARNING: string = 'SHOW_WARNING';
export const SHOW_ERROR: string = 'SHOW_ERROR';
export const DELETE_INFO: string = 'DELETE_INFO';

export class ShowInfo implements Action{
    readonly type: string = SHOW_INFO;

    constructor(public payload: InfoModel){}
}

export class ShowWarning implements Action{
    readonly type: string = SHOW_WARNING;

    constructor(public payload: InfoModel){}
}

export class ShowError implements Action{
    readonly type: string = SHOW_ERROR;

    constructor(public payload: InfoModel){}
}

export class DeleteInfo implements Action{
    readonly type: string = DELETE_INFO;

    constructor(public payload: number){}
}

export type InfoActions = ShowInfo | ShowWarning | ShowError | DeleteInfo;
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import {fromPromise} from 'rxjs/observable/fromPromise';

import * as AuthActions from './auth.actions';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class AuthEffects{
    @Effect()
    authTrySignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .switchMap((state: any) => {
        return this.httpClient.post('/token', {username: state.payload.username, password: state.payload.password});
    })
    .take(1)
    .switchMap((resp: any) => {
        return [resp.access_token];
    })
    .mergeMap((token: string) => {
        return [
        {
            type: AuthActions.SET_TOKEN,
            payload: token
        },
        {
            type: AuthActions.SIGNIN
        }];
    });

    
    @Effect({dispatch: false})
    authSigninReq = this.actions$
    .ofType(AuthActions.SIGNIN)
    .do(() => {
        this.router.navigate(['/home']);        
    })

    constructor(private actions$: Actions, private router: Router, private httpClient: HttpClient){}
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import * as fromReducers from './reducers';
import * as ProvidersActions from './providers.actions';
import * as InfoActions from '../../info/store/info.actions';
import { ProviderModel } from "../src/ProviderModel";
import { Router, ActivatedRoute } from "@angular/router";
import { InfoModel } from "../../src/InfoModel";
import { InfoTypes } from "../../src/InfoTypes";
import { HttpParams } from "@angular/common/http";
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ProvidersEffects{
    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromReducers.FeatureState>,
        private route: ActivatedRoute,
        private router: Router){}
    
    private providersUrl = environment.baseUrl + 'Providers';

    @Effect()
    providersFetch = this.actions$
    .ofType(ProvidersActions.FETCH_PROVIDERS)
    .switchMap((action: ProvidersActions.FetchProviders) =>
    {
        let params = new HttpParams();
        if(action.payload){
            params = params.append('currentPage', action.payload.currentPage.toString());
            params = params.append('itemsCount', action.payload.itemsCount.toString());
            params = params.append('itemsPerPage', action.payload.itemsPerPage.toString());
        }

        return this.httpClient.get<ProviderModel[]>(this.providersUrl, { params: params });        
    })
    .mergeMap((response: any) => {
        return [{
            payload: response === null ? {} : response.entities,
            type: ProvidersActions.SET_PROVIDERS
        },
        {
            payload: response.pageInfo,
            type: ProvidersActions.SET_PAGEINFO
        }];
    });

    @Effect()
    getProvider = this.actions$
    .ofType(ProvidersActions.GET_PROVIDER)
    .switchMap((action: ProvidersActions.GetProvider) => 
    {
      return this.httpClient.get<ProviderModel>(this.providersUrl + '/' + action.payload);
    })    
    .map((response: any) => {
        if (response.code) {
            if (response.code === 'ok') {
                return {
                    payload: response.data,
                    type: ProvidersActions.SET_EDIT_PROVIDER
                }
            }
            else{
                return {
                    payload: new InfoModel('✘ Ошибка!', response.desc, InfoTypes.Error),
                    type: InfoActions.SHOW_ERROR
                };
            }
        }
    });

    @Effect()
    addProvider = this.actions$
    .ofType(ProvidersActions.ADD_PROVIDER)
    .switchMap((action: ProvidersActions.AddProvider) => {
        return this.httpClient.post(this.providersUrl, action.payload).take(1);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/providers']);

            return{
                payload: new InfoModel('✔ Успешно!', 'Поставщик успешно добавлен.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
        else{
            return {
                payload: new InfoModel('✘ Ошибка!', response.desc, InfoTypes.Error),
                type: InfoActions.SHOW_ERROR
            };
        }
    });

    @Effect()
    updateProvider = this.actions$
    .ofType(ProvidersActions.EDIT_PROVIDER)
    .switchMap((action: ProvidersActions.EditProvider) => {
        return this.httpClient.put(this.providersUrl, action.payload.provider).take(1);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/providers']);
            return {
                payload: new InfoModel('✔ Успешно!', 'Запись изменена.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
    });

    @Effect()
    deleteProvider = this.actions$
    .ofType(ProvidersActions.DELETE_PROVIDER)
    .switchMap((action: ProvidersActions.DeleteProvider) => {
        return this.httpClient.delete(this.providersUrl + '?id='+action.payload)
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            return {
                payload: new InfoModel('✔ Успешно!', 'Успешно пидорнули.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
        else{
            return [{
                    payload: {},
                    type: ProvidersActions.FETCH_PROVIDERS
                },
                {
                    payload: new InfoModel('✘ Хуёво!', 'Хуёво пидорнули.', InfoTypes.Error)
                }
            ]
        }
    });
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import * as fromReducers from './reducers';
import * as ManufacturesActions from './manufactures.actions';
import * as InfoActions from '../../info/store/info.actions';
import { ManufactureModel } from "../src/ManufactureModel";
import { Router, ActivatedRoute } from "@angular/router";
import { InfoModel } from "../../src/InfoModel";
import { InfoTypes } from "../../src/InfoTypes";
import { PageInfo } from "../../src/PageInfo";
import { HttpParams } from "@angular/common/http";
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ManufacturesEffects{
    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromReducers.FeatureState>,
        private route: ActivatedRoute,
        private router: Router){}
    
    private manufacturesUrl: string = environment.baseUrl + 'Manufactures';
    
    @Effect()
    manufacturesFetch = this.actions$    
    .ofType(ManufacturesActions.FETCH_MANUFACTURES)
    .switchMap((action: ManufacturesActions.FetchManufactures) =>
    {
        let params = new HttpParams();
        if(action.payload){
            params = params.append('currentPage', action.payload.currentPage.toString());
            params = params.append('itemsCount', action.payload.itemsCount.toString());
            params = params.append('itemsPerPage', action.payload.itemsPerPage.toString());
        }

        return this.httpClient.get<ManufactureModel[]>(this.manufacturesUrl, { params: params });
    })
    .mergeMap((response: any) => {
        let manufactures = <ManufactureModel[]>response.entities;
        let pageInfo = <PageInfo>response.pageInfo;
        return [{
            payload: manufactures === null ? {} : manufactures,
            type: ManufacturesActions.SET_MANUFACTURES
        },
        {
            payload: pageInfo,
            type: ManufacturesActions.SET_PAGEINFO
        }];
    });

    @Effect()
    addManufacture = this.actions$
    .ofType(ManufacturesActions.ADD_MANUFACTURE)
    .switchMap((action: ManufacturesActions.AddManufacture) => {
        return this.httpClient.post(this.manufacturesUrl, action.payload).take(1);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/manufactures']);

            return{
                payload: new InfoModel('✔ Успешно!', 'Производитель успешно добавлена.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
        else{
            return{
                payload: new InfoModel('✘ Ошибка!', response.desc, InfoTypes.Error),
                type: InfoActions.SHOW_ERROR
            };
        }
    });

    @Effect()
    getManufacture = this.actions$
    .ofType(ManufacturesActions.GET_MANUFACTURE)
    .switchMap((action: ManufacturesActions.GetManufacture) => 
    {
      return this.httpClient.get<ManufactureModel>(this.manufacturesUrl + '/' + action.payload);
    })    
    .map((response: ManufactureModel) => {
        return {
            payload: response,
            type: ManufacturesActions.SET_EDIT_MANUFACTURE
        }
    });

    @Effect()
    updateManufacture = this.actions$
    .ofType(ManufacturesActions.EDIT_MANUFACTURE)
    .switchMap((action: ManufacturesActions.EditManufacture) => {
        return this.httpClient.put(this.manufacturesUrl, action.payload.manufacture).take(1);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/manufactures']);
            return {
                payload: new InfoModel('✔ Успешно!', 'Производитель успешно обновлён.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
        else{
            return{
                payload: new InfoModel('✘ Ошибка!', response.desc, InfoTypes.Error),
                type: InfoActions.SHOW_ERROR
            };
        }
    });

    @Effect()
    deleteManufacture = this.actions$
    .ofType(ManufacturesActions.DELETE_MANUFACTURE)
    .switchMap((action: ManufacturesActions.DeleteManufacture) => {
        return this.httpClient.delete(this.manufacturesUrl + '?id=' + action.payload)
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            return{
                payload: new InfoModel('✔ Успешно!', 'Успешно пидорнули.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
        else{
            return{
                    payload: new InfoModel('✘ Хуёво!', 'Хуёво пидорнули.', InfoTypes.Error)
                };
        }
    });
}
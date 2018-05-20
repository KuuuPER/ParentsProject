import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import * as fromReducers from './reducers';
import * as DeliveriesActions from './deliveries.actions';
import * as InfoActions from '../../info/store/info.actions';
import { DeliveryModel } from "../src/DeliveryModel";
import { Router, ActivatedRoute } from "@angular/router";
import { InfoModel } from "../../src/InfoModel";
import { InfoTypes } from "../../src/InfoTypes";
import { HttpParams } from "@angular/common/http";
import { PageInfo } from "../../src/PageInfo";
import { DeliveriesListService } from "../services/deliveries-list.service";
import { DeliveryService } from "../services/delivery.service";

@Injectable()
export class DeliveriesEffects{
    constructor(private actions$: Actions,
        private listService: DeliveriesListService,
        private service: DeliveryService,
        private store: Store<fromReducers.FeatureState>,
        private route: ActivatedRoute,
        private router: Router){}

    @Effect()
    deliveriesFetch = this.actions$
    .ofType(DeliveriesActions.FETCH_DELIVERIES)
    .switchMap((action: DeliveriesActions.FetchDeliveries) =>
    {
        return this.listService.fetchDeliveries(action.payload);
    })
    .mergeMap((response: any) => {
        let deliveries = response.data.entities;
        let pageInfo = response.data.pageInfo;
        return [{
            payload: deliveries === null ? {} : deliveries,
            type: DeliveriesActions.SET_DELIVERIES
        },
        {
            payload: pageInfo,
            type: DeliveriesActions.SET_PAGEINFO
        }];
    });

    @Effect()
    getDelivery = this.actions$
    .ofType(DeliveriesActions.GET_DELIVERY)
    .switchMap((action: DeliveriesActions.GetDelivery) => 
    {
      return this.service.getDelivery(action.payload);
    })    
    .map((response: any) => {
        if(response.code === 'ok'){
            return {
                payload: response.data,
                type: DeliveriesActions.SET_EDIT_DELIVERY
            }
        }
        else{
            return{
                payload: new InfoModel('✘ Ошибка!', response.desc, InfoTypes.Error),
                type: InfoActions.SHOW_INFO
            };
        }
    });

    @Effect()
    addDelivery = this.actions$
    .ofType(DeliveriesActions.ADD_DELIVERY)
    .switchMap((action: DeliveriesActions.AddDelivery) => {
        return this.service.addDelivery(action.payload);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/deliveries']);

            return{
                payload: new InfoModel('✔ Успешно!', 'Категория успешно добавлена.', InfoTypes.Success),
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
    updateDelivery = this.actions$
    .ofType(DeliveriesActions.EDIT_DELIVERY)
    .switchMap((action: DeliveriesActions.EditDelivery) => {
        return this.service.editDelivery(action.payload.delivery);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/deliveries']);
            return{
                payload: new InfoModel('✔ Успешно!', 'Категория успешно добавлена.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
        else{
            return{
                payload: new InfoModel('✘ Ошибка!', response.desc, InfoTypes.Error),
                type: InfoActions.SHOW_INFO
            };
        }
    });

    @Effect()
    deleteDelivery = this.actions$
    .ofType(DeliveriesActions.DELETE_DELIVERY)
    .switchMap((action: DeliveriesActions.DeleteDelivery) => {
        return this.service.deleteDelivery(action.payload);
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
                payload: new InfoModel('✘ Хуёво!', 'Хуёво пидорнули.', InfoTypes.Error),
                type: InfoActions.SHOW_INFO
            };
        }
    });

    @Effect()
    fetchPurchases = this.actions$
    .ofType(DeliveriesActions.GET_DELIVERY_PURCHASES)
    .switchMap((action: DeliveriesActions.GetPurchases) => {
        return this.service.getPurchases(action.payload);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            return {
                payload: response.data.entities,
                type: DeliveriesActions.SET_DELIVERY_PURCHASES
            }
        }
        else{
            return{
                payload: new InfoModel('✘ Ошибка!', response.desc, InfoTypes.Error),
                type: InfoActions.SHOW_INFO
            };
        }
    });
}
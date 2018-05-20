import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import * as fromReducers from './reducers';
import * as PurchasesActions from './purchases.actions';
import * as InfoActions from '../../info/store/info.actions';
import { PurchaseModel } from "../src/PurchaseModel";
import { Router, ActivatedRoute } from "@angular/router";
import { InfoModel } from "../../src/InfoModel";
import { InfoTypes } from "../../src/InfoTypes";
import { HttpParams } from "@angular/common/http";
import { PageInfo } from "../../src/PageInfo";
import { PurchasesListService } from "../services/purchases-list.service";
import { PurchaseService } from "../services/purchase.service";

@Injectable()
export class PurchasesEffects{
    constructor(private actions$: Actions,
        private listService: PurchasesListService,
        private service: PurchaseService,
        private store: Store<fromReducers.FeatureState>,
        private route: ActivatedRoute,
        private router: Router){}

    @Effect()
    purchasesFetch = this.actions$
    .ofType(PurchasesActions.FETCH_PURCHASES)
    .switchMap((action: PurchasesActions.FetchPurchases) =>
    {
        return this.listService.fetchPurchases(action.payload);
    })
    .mergeMap((response: any) => {
        let purchases = response.data.entities;
        let pageInfo = response.data.pageInfo;
        return [{
            payload: purchases === null ? {} : purchases,
            type: PurchasesActions.SET_PURCHASES
        },
        {
            payload: pageInfo,
            type: PurchasesActions.SET_PAGEINFO
        }];
    });

    @Effect()
    getPurchase = this.actions$
    .ofType(PurchasesActions.GET_PURCHASE)
    .switchMap((action: PurchasesActions.GetPurchase) => 
    {
      return this.service.getPurchase(action.payload);
    })    
    .map((response: any) => {
        if (response.code === 'ok') {
            return {
                payload: response.data,
                type: PurchasesActions.SET_EDIT_PURCHASE
            }
        }
        else{
            return{
                payload: new InfoModel('✘ Ошибка!', response.desc, InfoTypes.Error),
                type: InfoActions.SHOW_ERROR
            };
        }
    });

    @Effect()
    getPurchaseDeliveries = this.actions$
    .ofType(PurchasesActions.GET_PURCHASE_DELIVERIES)
    .switchMap((action: PurchasesActions.GetDeliveries) =>
    {
        return this.service.getPurchaseDeliveries(action.payload);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            let deliveries = response.data.entities;
            
            return {
                payload: deliveries === null ? [] : deliveries,
                type: PurchasesActions.SET_PURCHASE_DELIVERIES
            }
        }
    });

    @Effect()
    addPurchase = this.actions$
    .ofType(PurchasesActions.ADD_PURCHASE)
    .switchMap((action: PurchasesActions.AddPurchase) => {
        return this.service.addPurchase(action.payload);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/purchases']);

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
    updatePurchase = this.actions$
    .ofType(PurchasesActions.EDIT_PURCHASE)
    .switchMap((action: PurchasesActions.EditPurchase) => {
        return this.service.editPurchase(action.payload.purchase);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/purchases']);
            return{
                payload: new InfoModel('✔ Успешно!', 'Категория успешно добавлена.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
    });

    @Effect()
    deletePurchase = this.actions$
    .ofType(PurchasesActions.DELETE_PURCHASE)
    .switchMap((action: PurchasesActions.DeletePurchase) => {
        return this.service.deletePurchase(action.payload);
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
}
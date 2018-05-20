import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import * as fromReducers from './reducers';
import * as DriversActions from './drivers.actions';
import * as InfoActions from '../../info/store/info.actions';
import { Router } from "@angular/router";
import { InfoModel } from "../../src/InfoModel";
import { InfoTypes } from "../../src/InfoTypes";
import { PageInfo } from "../../src/PageInfo";
import { DriversListService } from "../services/drivers-list.service";

@Injectable()
export class DriversEffects{
    constructor(private actions$: Actions,
        private service: DriversListService,
        private store: Store<fromReducers.FeatureState>,
        private router: Router){}

    @Effect()
    driversFetch = this.actions$
    .ofType(DriversActions.FETCH_DRIVERS)
    .switchMap((action: DriversActions.FetchDrivers) =>
    {
        return this.service.fetchDrivers(action.payload);
    })
    .mergeMap((response: any) => {
        return [{
            payload: response.data.entities === null ? {} : response.data.entities,
            type: DriversActions.SET_DRIVERS
        },
        {
            payload: response.data.pageInfo,
            type: DriversActions.SET_PAGEINFO
        }];
    });

    @Effect()
    getDriver = this.actions$
    .ofType(DriversActions.GET_DRIVER)
    .switchMap((action: DriversActions.GetDriver) => 
    {
      return this.service.fetchDriverById(action.payload);
    })    
    .map((response: any) => {
        return {
            payload: response.data,
            type: DriversActions.SET_EDIT_DRIVER
        }
    });

    @Effect()
    addDriver = this.actions$
    .ofType(DriversActions.ADD_DRIVER)
    .switchMap((action: DriversActions.AddDriver) => {
        return this.service.addDriver(action.payload);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/drivers']);

            return{
                payload: new InfoModel('✔ Успешно!', 'Водитель успешно добавлен.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
        else{
            return{
                payload: new InfoModel('✘ Ошибка!', response.desc, InfoTypes.Error),
                type: InfoActions.SHOW_ERROR
            };
        };
    });

    @Effect()
    updateDriver = this.actions$
    .ofType(DriversActions.EDIT_DRIVER)
    .switchMap((action: DriversActions.EditDriver) => {
        return this.service.editDriver(action.payload.driver);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/drivers']);
            return{
                payload: new InfoModel('✔ Успешно!', 'Водитель успешно изменён.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
        else{
            return{
                payload: new InfoModel('✘ Ошибка!', response.desc, InfoTypes.Error),
                type: InfoActions.SHOW_ERROR
            };
        };
    });

    @Effect()
    deleteDriver = this.actions$
    .ofType(DriversActions.DELETE_DRIVER)
    .switchMap((action: DriversActions.DeleteDriver) => {
        return this.service.deleteDriver(action.payload);
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
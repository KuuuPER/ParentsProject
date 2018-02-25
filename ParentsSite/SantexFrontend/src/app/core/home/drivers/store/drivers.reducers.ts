import * as Actions from './drivers.actions';
import { DriverModel } from '../src/DriverModel';

import * as fromApp from '../../../../store/app.reducers';
import { PageInfo } from '../../src/PageInfo';
import { INameId } from '../../src/INameId';
import { DeliveryModel, DeliveryStatus } from '../../deliveries/src/DeliveryModel';

export interface FeatureState extends fromApp.AppState {
    drivers: State;
}

export interface State{
    drivers: DriverModel[];    
    pageInfo: PageInfo;
}

const initialState: State = {
    drivers: [
        {
            id: '1',
            name: 'Махмуд',
            rate: 1,
            notes: 'Нормально',
            deliveries: [ new DeliveryModel('1', 'Северная 21, д. 2', 4, new Date(2018, 2, 25), null, DeliveryStatus.Delivered) ]
        }],
    pageInfo: new PageInfo(10, 3, 1)
}

export function driversReducer(state: State = initialState, action: Actions.DriverActions){
    switch (action.type) {
        case Actions.SET_DRIVERS:
        return {
            ...state,
            drivers: [...(<DriverModel[]>action.payload)]
        };
        case Actions.ADD_DRIVER:
        if (state.drivers.length < state.pageInfo.itemsPerPage) {
            return{
                ...state,
                drivers: [
                    ...state.drivers,
                    <DriverModel>action.payload
                ]
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_DRIVER:
        const payload = <{driver: DriverModel, index: number}>action.payload;
        const driverToUpdate = {
            ...state.drivers[payload.index],
            ...payload.driver
        };
        const drivers = [...state.drivers];
        drivers[payload.index] = driverToUpdate;
        const newDrivers = [...drivers];
        return {
            ...state,
            drivers: newDrivers
        };
        case Actions.PREVIOUS_PAGE:
        case Actions.NEXT_PAGE:
        const newCurrentPage = <number>action.payload;
        return {
            ...state,
            currentPage: newCurrentPage
        };
        default:
            return state;
    }
}
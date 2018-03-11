import * as Actions from '../drivers.actions';
import { DriverModel } from '../../src/DriverModel';

import * as fromApp from '../../../../../store/app.reducers';
import { PageInfo } from '../../../src/PageInfo';
import { INameId } from '../../../src/INameId';
import { DeliveryModel, DeliveryStatus } from '../../../deliveries/src/DeliveryModel';

export interface FeatureState extends fromApp.AppState {
    drivers: State;
}

export interface State{
    ids: string[],
    drivers: {[id: string]: DriverModel};    
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: ['0', '1', '2'],
    drivers: {
        '0':
            {
                id: '0',
                name: 'Махмуд',
                rate: 1,
                notes: 'Нормально',
                deliveries: [ new DeliveryModel('1', 'Северная 21, д. 2', 4, new Date(2018, 2, 25), null, DeliveryStatus.Delivered) ]
            },
        '1':
            {
                id: '1',
                name: 'Аслан',
                rate: 1,
                notes: 'Нормально',
                deliveries: [ new DeliveryModel('1', 'Северная 21, д. 2', 4, new Date(2018, 2, 25), null, DeliveryStatus.Delivered) ]
            },
        '2':
            {
                id: '2',
                name: 'Руслан',
                rate: 1,
                notes: 'Нормально',
                deliveries: [ new DeliveryModel('1', 'Северная 21, д. 2', 4, new Date(2018, 2, 25), null, DeliveryStatus.Delivered) ]
            }},
    pageInfo: new PageInfo(10, 3, 1)
};

export function driversReducer(state: State = initialState, action: Actions.DriverActions){
    switch (action.type) {
        case Actions.SET_DRIVERS:
        let driverModels :{[id: string]: DriverModel} = {};
        (<DriverModel[]>action.payload).forEach(dm => driverModels[dm.id] = dm);
        return {
            ...state,
            drivers: driverModels
        };
        case Actions.ADD_DRIVER:
        if (Object.keys(state.drivers).length < state.pageInfo.itemsPerPage) {
            let newDriver: {[id: string]: DriverModel}= {};
            const payload= <DriverModel>action.payload;
            newDriver[payload.id] = payload
            return{
                ...state,
                drivers: {
                    ...state.drivers,
                    ...newDriver
                }
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_DRIVER:
        const payload = <{driver: DriverModel, id: string}>action.payload;
        const driverToUpdate = {
            ...state.drivers[payload.id],
            ...payload.driver
        };
        const drivers = {...state.drivers};
        drivers[payload.id] = driverToUpdate;
        const newDrivers = {...drivers};
        return {
            ...state,
            drivers: newDrivers
        };
        case Actions.DELETE_DRIVER:
        const id = <string>action.payload;
        const oldState = {...state};
        delete oldState.drivers[id];
        const ids = oldState.ids.filter(i => i !== id);
        return {
            ...state,
            ids: [...ids],
            categories: {...oldState.drivers},
        };
        case Actions.PREVIOUS_PAGE:
        case Actions.NEXT_PAGE:
        const newCurrentPage = <number>action.payload;
        return {
            ...state,
            pageInfo: <PageInfo>{
                ...state.pageInfo,
                currentPage: newCurrentPage
            }
        };
        default:
            return state;
    }
}

export const getDrivers = (state: State) => state.drivers;
export const getIds = (state: State) => state.ids;
export const getPageInfo = (state: State) => state.pageInfo;
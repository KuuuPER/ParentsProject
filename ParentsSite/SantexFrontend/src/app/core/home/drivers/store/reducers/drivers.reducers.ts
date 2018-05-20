import * as Actions from '../drivers.actions';
import { DriverModel } from '../../src/DriverModel';

import * as fromApp from '../../../../../store/app.reducers';
import { PageInfo } from '../../../src/PageInfo';
import { INameId } from '../../../src/INameId';
import { DeliveryStatus } from '../../../deliveries/src/DeliveryStatus';
import { DriverDeliveryModel } from '../../src/DriverDeliveryModel';

export interface FeatureState extends fromApp.AppState {
    drivers: State;
}

export interface State{
    ids: string[],
    drivers: {[id: string]: DriverModel};
    editedDriver: DriverModel,
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: [],
    drivers: {},
    editedDriver: null,
    pageInfo: null
};

export function driversReducer(state: State = initialState, action: Actions.DriverActions): State{
    switch (action.type) {
        case Actions.SET_DRIVERS:        
        const driverModels :{[id: string]: DriverModel} = {};        
        const newIds = [];
        if (action.payload) {
            const drivers = [...(<DriverModel[]>action.payload)];
            drivers.forEach(dm => {driverModels[dm.id] = dm; newIds.push(dm.id);});
        }        
        return {
            ...state,
            ids: [...newIds],
            drivers: driverModels
        };
        case Actions.ADD_DRIVER:
        if (Object.keys(state.drivers).length < state.pageInfo.itemsPerPage) {
            let newDriver: {[id: string]: DriverModel}= {};
            const payload= <DriverModel>action.payload;
            newDriver[payload.id] = createDriverFromPayload(payload);
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
            drivers: {...oldState.drivers},
        };
        case Actions.SET_EDIT_DRIVER:
        const driver = <DriverModel>action.payload;        
        const editedDriver = createDriverFromPayload(driver);
        return {
            ...state,
            editedDriver: editedDriver
        };
        case  Actions.SET_PAGEINFO:
        const pageInfo = <PageInfo>action.payload;
        const newPageInfo = new PageInfo(pageInfo.itemsPerPage, pageInfo.itemsCount, pageInfo.currentPage);
        return <State>{
            ...state,
            pageInfo: newPageInfo
        };
        case Actions.CHANGE_PAGE:
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

function createDriverFromPayload(payload: DriverModel){
    const newDriverDeliveries: DriverDeliveryModel[] = new Array<DriverDeliveryModel>();
    if (payload.deliveries) {
        let deliveries = [...payload.deliveries];
        deliveries.forEach(d => newDriverDeliveries.push(new DriverDeliveryModel(d.id, d.deliveryDate, d.status, d.purchasesCount)))
    }

    return new DriverModel(payload.id, payload.name, payload.rate, payload.notes, newDriverDeliveries);
}

export const getDrivers = (state: State) => state.drivers;
export const getIds = (state: State) => state.ids;
export const getEditedDriver = (state: State) => state.editedDriver;
export const getEditedDriverDeliveries = (state: State) => state.editedDriver.deliveries;
export const getPageInfo = (state: State) => state.pageInfo;
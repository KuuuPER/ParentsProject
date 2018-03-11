import * as Actions from '../deliveries.actions';
import { DeliveryModel, DeliveryStatus } from '../../src/DeliveryModel';

import * as fromProducts from '../../../products/store/reducers/products.reducers';
import { PageInfo } from '../../../src/PageInfo';
import { INameId } from '../../../src/INameId';

export interface State{
    ids: string[],
    deliveries: {[id: string]: DeliveryModel};
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: ['0', '1','2'],
    deliveries: {
        '0': new DeliveryModel('0', '3-я улица Строителей, д. 20, кв. 58', 5, new Date(2018, 2, 23 ), { id: '1', name: 'Махмуд' }, DeliveryStatus.New),
        '1': new DeliveryModel('1', 'Суворова, д. 2, кв. 5', 5, new Date(2018, 2, 23 ), { id: '2', name: 'Аслан' }, DeliveryStatus.New),
        '2': new DeliveryModel('2', 'Ермолова, д. 12, кв. 9', 5, new Date(2018, 2, 23 ), { id: '3', name: 'Руслан' }, DeliveryStatus.New)
    },
    pageInfo: new PageInfo(10, 3, 1)
}

export function deliveriesReducer(state: State = initialState, action: Actions.DeliveriesActions){
    switch (action.type) {
        case Actions.SET_DELIVERIES:
        let deliveriesModels: {[id: string]: DeliveryModel} = {};
        (<DeliveryModel[]>action.payload).forEach(dm => deliveriesModels[dm.id] = dm);
        return {
            ...state,
            deliveries: deliveriesModels
        };
        case Actions.ADD_DELIVERY:
        if (Object.keys(state.deliveries).length < state.pageInfo.itemsPerPage) {
            const newDeliveryModel: {[id: string]: DeliveryModel} = {};
            const payload = <DeliveryModel>action.payload;
            newDeliveryModel[payload.id] = payload;
            return{
                ...state,
                deliveries: {
                    ...state.deliveries,
                    ...newDeliveryModel
                }
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_DELIVERY:
        const payload = <{delivery: DeliveryModel, id: string}>action.payload;
        const oldDeliveries = {...state.deliveries};
        oldDeliveries[payload.id] = payload.delivery;
        const newDeliveries = {...oldDeliveries};
        return {
            ...state,
            deliveries: newDeliveries
        };
        case Actions.DELETE_DELIVERY:
        const id = <string>action.payload;
        const oldState = {...state};
        delete oldState.deliveries[id];
        const ids = oldState.ids.filter(i => i !== id);
        return {
            ...state,
            ids: [...ids],
            categories: {...oldState.deliveries},
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

export const getDeliveries = (state: State) => state.deliveries;
export const getIds = (state: State) => state.ids;
export const getPageInfo = (state: State) => state.pageInfo;
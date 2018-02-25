import * as Actions from './deliveries.actions';
import { DeliveryModel, DeliveryStatus } from '../src/DeliveryModel';

import * as fromProducts from '../../products/store/products.reducers';
import { PageInfo } from '../../src/PageInfo';
import { INameId } from '../../src/INameId';

export interface FeatureState extends fromProducts.FeatureState {
    deliveries: State;
}

export interface State{
    deliveries: DeliveryModel[];
    drivers: INameId[]
    pageInfo: PageInfo;
}

const initialState: State = {
    deliveries: [
        new DeliveryModel('1', '3-я улица Строителей, д. 20, кв. 58', 5, new Date(2018, 2, 23 ), { Id: '1', Name: 'Махмуд' }, DeliveryStatus.New),
        new DeliveryModel('2', 'Суворова, д. 2, кв. 5', 5, new Date(2018, 2, 23 ), { Id: '2', Name: 'Аслан' }, DeliveryStatus.New),
        new DeliveryModel('3', 'Ермолова, д. 12, кв. 9', 5, new Date(2018, 2, 23 ), { Id: '3', Name: 'Руслан' }, DeliveryStatus.New)
    ],
    drivers: [ { Id: '1', Name: 'Махмуд' }, { Id: '2', Name: 'Аслан' }, { Id: '3', Name: 'Руслан' } ],
    pageInfo: new PageInfo(10, 3, 1)
}

export function deliveriesReducer(state: State = initialState, action: Actions.DeliveriesActions){
    switch (action.type) {
        case Actions.SET_DELIVERIES:
        return {
            ...state,
            deliveries: [...(<DeliveryModel[]>action.payload)]
        };
        case Actions.ADD_DELIVERY:
        if (state.deliveries.length < state.pageInfo.itemsPerPage) {
            return{
                ...state,
                deliveries: [
                    ...state.deliveries,
                    <DeliveryModel>action.payload
                ]
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_DELIVERY:
        const payload = <{delivery: DeliveryModel, index: number}>action.payload;
        const deliveryToUpdate = {
            ...state.deliveries[payload.index],
            ...payload.delivery
        };
        const deliveries = [...state.deliveries];
        deliveries[payload.index] = <DeliveryModel>deliveryToUpdate;
        const newDeliveries = [...deliveries];
        return {
            ...state,
            deliveries: newDeliveries
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
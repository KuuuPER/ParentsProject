import * as Actions from './purchases.actions';
import { PurchaseModel } from '../src/PurchaseModel';

import * as fromProducts from '../../products/store/products.reducers';
import { PageInfo } from '../../src/PageInfo';
import { INameId } from '../../src/INameId';
import { ContactModel } from '../src/ContactModel';
import { ProductModel } from '../../products/src/ProductModel';
import { DeliveryModel, DeliveryStatus } from '../../deliveries/src/DeliveryModel';

export interface FeatureState extends fromProducts.FeatureState {
    purchases: State;
}

export interface State{
    purchases: PurchaseModel[]
    pageInfo: PageInfo;
}

const initialState: State = {
    purchases: [new PurchaseModel(
        '1',
        new ContactModel('Мадина', '3-я улица строителей, д.3', '79999228115'),
        new Date(2018, 2, 23),
        [new ProductModel('1', 'унитаз', '123456', {Name: 'Категория 1', Id: '1'}, { Name: 'Производитель 1', Id: '1' }, { Name: 'Поставщик 1', Id: '1' }, 1, 1000, 1300) ],
        new DeliveryModel('1', '3-я улица строителей, д.3', 1, new Date(2018, 3, 8), { Name: 'Махмуд', Id: '1' }, DeliveryStatus.New),
    )],
    pageInfo: new PageInfo(10, 3, 1)
}

export function purchasesReducer(state: State = initialState, action: Actions.PurchasesActions){
    switch (action.type) {
        case Actions.SET_PURCHASES:
        return {
            ...state,
            purchases: [...(<PurchaseModel[]>action.payload)]
        };
        case Actions.ADD_PURCHASE:
        if (state.purchases.length < state.pageInfo.itemsPerPage) {
            return{
                ...state,
                purchases: [
                    ...state.purchases,
                    <PurchaseModel>action.payload
                ]
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_PURCHASE:
        const payload = <{purchase: PurchaseModel, index: number}>action.payload;
        const purchaseToUpdate = {
            ...state.purchases[payload.index],
            ...payload.purchase
        };
        const purchases = [...state.purchases];
        purchases[payload.index] = <PurchaseModel>purchaseToUpdate;
        const newPurchases = [...purchases];
        return {
            ...state,
            purchases: newPurchases
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
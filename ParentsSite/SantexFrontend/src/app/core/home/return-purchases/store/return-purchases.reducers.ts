import * as Actions from './return-purchases.actions';
import { ReturnPurchaseModel } from '../src/ReturnPurchaseModel';

import * as fromProducts from '../../products/store/products.reducers';
import { PageInfo } from '../../src/PageInfo';
import { INameId } from '../../src/INameId';
import { ProductModel } from '../../products/src/ProductModel';
import { DeliveryModel, DeliveryStatus } from '../../deliveries/src/DeliveryModel';
import { PurchaseUnitModel } from '../../src/PurchaseUnit';
import { PurchaseUnitStatus } from '../../src/PurchaseUnitStatus';
import { ReturnReason } from '../src/ReturnReason';

export interface FeatureState extends fromProducts.FeatureState {
    purchases: State;
}

export interface State{
    purchases: ReturnPurchaseModel[]
    pageInfo: PageInfo;
}

const initialState: State = {
    purchases: [new ReturnPurchaseModel(
        '1',
        {Id: '1', Name: 'Покупка 1'},
        [ new PurchaseUnitModel({Id: '1', Name: 'Покупка 1'}, {Id: '1', Name: 'Товар 1'}, 1, 5000, new Date(2018, 2, 26), new Date(2018, 2, 27), PurchaseUnitStatus.New) ],
        'нет',
        ReturnReason.Defect)
    ],
    pageInfo: new PageInfo(10, 3, 1)
}

export function returnPurchasesReducer(state: State = initialState, action: Actions.ReturnPurchasesActions){
    switch (action.type) {
        case Actions.SET_RETURN_PURCHASES:
        return {
            ...state,
            purchases: [...(<ReturnPurchaseModel[]>action.payload)]
        };
        case Actions.ADD_RETURN_PURCHASE:
        if (state.purchases.length < state.pageInfo.itemsPerPage) {
            return{
                ...state,
                purchases: [
                    ...state.purchases,
                    <ReturnPurchaseModel>action.payload
                ]
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_RETURN_PURCHASE:
        const payload = <{returnPurchase: ReturnPurchaseModel, index: number}>action.payload;
        const purchaseToUpdate = {
            ...state.purchases[payload.index],
            ...payload.returnPurchase
        };
        const purchases = [...state.purchases];
        purchases[payload.index] = <ReturnPurchaseModel>purchaseToUpdate;
        const newReturnPurchases = [...purchases];
        return {
            ...state,
            purchases: newReturnPurchases
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
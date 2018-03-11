import * as Actions from '../purchases.actions';
import { PurchaseModel } from '../../src/PurchaseModel';

import * as fromProducts from '../../../products/store/reducers/products.reducers';
import { PageInfo } from '../../../src/PageInfo';
import { INameId } from '../../../src/INameId';
import { ContactModel } from '../../src/ContactModel';
import { ProductModel } from '../../../products/src/ProductModel';
import { DeliveryModel, DeliveryStatus } from '../../../deliveries/src/DeliveryModel';
import { PurchaseUnitModel } from '../../../src/PurchaseUnit';
import { ReturnPurchaseModel } from '../../../return-purchases/src/ReturnPurchaseModel';

export interface State{
    ids: string[];
    purchases: {[id: string]: PurchaseModel};
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: ['0'],
    purchases: {'0': new PurchaseModel(
        '0',
        new ContactModel('1', 'Мадина', '3-я улица строителей, д.3', '79999228115'),
        new Date(2018, 2, 23),
        [new PurchaseUnitModel('1', {id: '1', name: 'Зухра 22.02.2018'}, {id: '1', name: 'унитаз'}, 1, 3000, new Date(2018, 3, 3), new Date(2018, 3, 3))],
        new DeliveryModel('1', '3-я улица строителей, д.3', 1, new Date(2018, 3, 8), { name: 'Махмуд', id: '1' }, DeliveryStatus.New),
    )},
    pageInfo: new PageInfo(10, 3, 1)
}

export function purchasesReducer(state: State = initialState, action: Actions.PurchasesActions): State{
    switch (action.type) {
        case Actions.SET_PURCHASES:
        let purchasesModels: {[id: number] : PurchaseModel} = {};
        (<PurchaseModel[]> action.payload).forEach(pm => purchasesModels[pm.id] = pm);
        return {
            ...state,
            purchases: purchasesModels
        };
        case Actions.ADD_PURCHASE:
        if (Object.keys(state.purchases).length < state.pageInfo.itemsPerPage) {
            let newPurchase: {[id: number] : PurchaseModel} = {}; 
            const payload = <PurchaseModel>action.payload;
            newPurchase[payload.id] = payload;
            return{
                ...state,
                purchases: {
                    ...state.purchases,
                    ...newPurchase
                }
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_PURCHASE:
        const payload = <{purchase: PurchaseModel, id: string}>action.payload;
        const oldPurchases = {...state.purchases};
        oldPurchases[payload.id] = payload.purchase;
        const newPurchases = {...oldPurchases};
        return {
            ...state,
            purchases: newPurchases
        };
        case Actions.DELETE_PURCHASE:
        const id = <string>action.payload;
        const oldState = {...state};
        delete oldState.purchases[id];
        const ids = oldState.ids.filter(i => i !== id);
        return {
            ...state,
            ids: [...ids],
            purchases: {...oldState.purchases},
        };
        case Actions.PREVIOUS_PAGE:
        case Actions.NEXT_PAGE:
        const newCurrentPage = <number>action.payload;
        const newPageInfo = <PageInfo>{...state.pageInfo, currentPage: newCurrentPage}
        return {
            ...state,
            pageInfo: newPageInfo
        };
        default:
            return state;
    }
}

export const getPurchases = (state: State) => state.purchases;
export const getIds = (state: State) => state.ids;
export const getPageInfo = (state: State) => state.pageInfo;
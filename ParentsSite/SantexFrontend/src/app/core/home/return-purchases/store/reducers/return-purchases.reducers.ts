import * as Actions from '../return-purchases.actions';
import { ReturnPurchaseModel } from '../../src/ReturnPurchaseModel';

import * as fromReturnPurchases from './return-purchases.reducers';
import * as fromPurchases from '../../../purchases/store/reducers/purchases.reducers';
import * as fromProducts from '../../../products/store/reducers/products.reducers';
import * as fromIndex from './index';
import { PageInfo } from '../../../src/PageInfo';
import { INameId } from '../../../src/INameId';
import { ProductModel } from '../../../products/src/ProductModel';
import { DeliveryModel } from '../../../deliveries/src/DeliveryModel';
import { DeliveryStatus } from '../../../deliveries/src/DeliveryStatus';
import { PurchaseUnitModel } from '../../../src/PurchaseUnit';
import { PurchaseUnitStatus } from '../../../src/PurchaseUnitStatus';
import { ReturnReason } from '../../src/ReturnReason';

export interface State{
    ids: string[];
    returnPurchases: {[id: string] : ReturnPurchaseModel};
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: [],
    returnPurchases: {},
    pageInfo: null
}

export function returnPurchasesReducer(state: State = initialState, action: Actions.ReturnPurchasesActions): State{
    switch (action.type) {
        case Actions.SET_RETURN_PURCHASES:
        return {
            ...state,
            returnPurchases: {...<{[id: number] : ReturnPurchaseModel}>action.payload}
        };
        case Actions.ADD_RETURN_PURCHASE:
        if (Object.keys(state.returnPurchases).length < state.pageInfo.itemsPerPage) {
            const newReturnPurchase: ReturnPurchaseModel = <ReturnPurchaseModel>action.payload;
            return{
                ...state,
                returnPurchases: {
                    ...state.returnPurchases,
                    newReturnPurchase
                }
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_RETURN_PURCHASE:
        const payload = <{returnPurchase: ReturnPurchaseModel, id: string}>action.payload;
        const oldPurchases = {...state.returnPurchases};
        oldPurchases[payload.id] = payload.returnPurchase;
        return {
            ...state,
            returnPurchases: {...oldPurchases}
        };
        case Actions.DELETE_RETURN_PURCHASE:
        const id = <string>action.payload;
        const oldState = {...state};
        delete oldState.returnPurchases[id];
        const ids = oldState.ids.filter(i => i !== id);
        return {
            ...state,
            ids: [...ids],
            returnPurchases: {...oldState.returnPurchases},
        };
        case Actions.PREVIOUS_PAGE:
        case Actions.NEXT_PAGE:
        const newCurrentPage = <number>action.payload;
        const newPageInfo = <PageInfo>{...state.pageInfo, currentPage: newCurrentPage};
        return {
            ...state,
            pageInfo: newPageInfo
        };
        default:
            return state;
    }
}

export const getReturnPurchases = (state: State) => state.returnPurchases;
export const getIds = (state: State) => state.ids;
export const getPageInfo = (state: State) => state.pageInfo;
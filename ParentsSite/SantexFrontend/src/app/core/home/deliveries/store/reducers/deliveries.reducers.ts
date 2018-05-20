import * as Actions from '../deliveries.actions';

import * as fromProducts from '../../../products/store/reducers/products.reducers';
import { DeliveryModel } from '../../src/DeliveryModel';
import { PageInfo } from '../../../src/PageInfo';
import { INameId } from '../../../src/INameId';
import { DeliveryStatus } from '../../src/DeliveryStatus';
import { DeliveryPurchaseModel } from '../../src/DeliveryPurchaseModel';
import { PurchaseUnitModel } from '../../../src/PurchaseUnit';

export interface State{
    ids: string[],
    deliveries: {[id: string]: DeliveryModel};
    editDelivery: DeliveryModel;
    deliveryUnits: PurchaseUnitModel[];
    purchases: DeliveryPurchaseModel[];
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: [],
    deliveries: {},
    editDelivery: null,
    purchases: [],
    deliveryUnits: [],
    pageInfo: null
}

export function deliveriesReducer(state: State = initialState, action: Actions.DeliveriesActions): State{
    switch (action.type) {
        case Actions.SET_DELIVERIES:
        const fetchedDeliveries = [...<DeliveryModel[]>action.payload];
        let deliveriesModels: {[id: string]: DeliveryModel} = {};
        const newIds = [];
        fetchedDeliveries.forEach(dm => {newIds.push(dm.id); deliveriesModels[dm.id] = dm;});
        return {
            ...state,
            ids: newIds,
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
            deliveries: {...oldState.deliveries},
        };
        case Actions.SET_EDIT_DELIVERY:
        const editDeliv = <DeliveryModel>action.payload;
        const editPurchases = editDeliv.purchases.map(p => new DeliveryPurchaseModel(p.id, p.address, p.timeFrom, p.timeTo, p.notes, p.contacts, p.purchaseUnits.map(pu =>
            new PurchaseUnitModel(pu.id, pu.product, pu.count, pu.storePrice, pu.purchaseUnitStatus))));
        const newDeliv = new DeliveryModel(editDeliv.id, new Date(editDeliv.deliveryDate), editDeliv.driver, editPurchases);
        return {
            ...state,
            editDelivery: newDeliv
        };
        case Actions.SET_DELIVERY_PURCHASES:
        const fetchedPurchases = [...<DeliveryPurchaseModel[]>action.payload];
        const purchasesArray = [];
        fetchedPurchases.forEach(p => purchasesArray.push(new DeliveryPurchaseModel(p.id, p.address, p.timeFrom, p.timeTo, p.notes, p.contacts, p.purchaseUnits)));
        return {
            ...state,
            purchases: purchasesArray
        };
        case  Actions.ADD_PURCHASE_UNIT:
        const addedUnit = <{unit: PurchaseUnitModel, purchaseId: string}>action.payload;
        let purchaseIndex: number;
        const purchase = state.purchases.find((p, i) => { purchaseIndex = i; return p.id === addedUnit.purchaseId});
        const oldProducts = [...state.deliveryUnits];
        let newUnits: PurchaseUnitModel[];
        let index: number;
        if (oldProducts.some((p, i) => {index = i; return p.id === addedUnit.unit.id;})) {
            newUnits = changeProductsCount(oldProducts, addedUnit.unit.id, 1)
        }
        else{
            const newUnit = new PurchaseUnitModel(addedUnit.unit.id, addedUnit.unit.product, 1, addedUnit.unit.storePrice, addedUnit.unit.purchaseUnitStatus);
            newUnits = [...oldProducts];
            newUnits.push(newUnit);
        }
        const newPurchases = [...state.purchases];
        let oldPurchaseUnits = [...purchase.purchaseUnits];
        let purchaseUnitIndex: number;
        const oldPUnit = oldPurchaseUnits.find((pu, i) => {purchaseUnitIndex = i ; return pu.id === addedUnit.unit.id;});
        oldPurchaseUnits[purchaseUnitIndex] = {...oldPUnit, count: oldPUnit.count - 1};
        newPurchases[purchaseIndex] = {...purchase, purchaseUnits: [...oldPurchaseUnits]};
        return {
            ...state,
            deliveryUnits: newUnits,
            purchases: newPurchases
        };
        case Actions.DELETE_PURCHASE_UNIT:
        const oldPurchases = [...state.purchases];
        const deletePayload = <{purchaseUnitId: string}>action.payload;
        let pIndex: number;
        const oldPurchase = <DeliveryPurchaseModel>oldPurchases.find((p, i) => { pIndex = i; return p.purchaseUnits.some(pu => pu.id === deletePayload.purchaseUnitId)});
        const products = [...oldPurchase.purchaseUnits];
        const deletedUnitId = deletePayload.purchaseUnitId;
        let purchaseUnits: PurchaseUnitModel[];
        let unitIndex: number;
        let oldDevUnits = [...state.deliveryUnits];
        if (oldDevUnits.some((p, i) => {unitIndex = i; return p.id === deletedUnitId && p.count > 1;})) {
            const delUnit = {...oldDevUnits[unitIndex]};
            delUnit.count -= 1;
            oldDevUnits[unitIndex] = delUnit;
        }
        else{
            const filteredUnits = oldDevUnits.filter(p => p.id !== deletedUnitId);
            oldDevUnits = [...filteredUnits];
        }
        purchaseUnits = changeProductsCount(products, deletedUnitId, 1);
        oldPurchases[pIndex] = {...oldPurchase, purchaseUnits: [...purchaseUnits]};
        return {
            ...state,
            deliveryUnits: [...oldDevUnits],
            purchases: [...oldPurchases]
        };
        case Actions.CLEAR_PURCHASE_UNITS:
        return {
            ...state,
            deliveryUnits: []
        };
        case  Actions.SET_PAGEINFO:
        const pageInfo = <PageInfo>action.payload;
        const newPageInfo = new PageInfo(pageInfo.itemsPerPage, pageInfo.itemsCount, pageInfo.currentPage);
        return {
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

function changeProductsCount(oldProducts: PurchaseUnitModel[], unitId: string, diff: number){
    let index: number;
    const incrementedProduct = oldProducts.find((p, i) => {
        index = i;
        return p.id === unitId
    });
    const newProducts = [...oldProducts];
    if (incrementedProduct) {
        const changedProduct = new PurchaseUnitModel(incrementedProduct.id, incrementedProduct.product, incrementedProduct.count + diff, incrementedProduct.storePrice, incrementedProduct.purchaseUnitStatus);
        newProducts[index] = changedProduct;
    }

    return newProducts;
}

export const getDeliveries = (state: State) => state.deliveries;
export const getDeliveryUnits = (state: State) => state.deliveryUnits;
export const getEditDelivery = (state: State) => state.editDelivery;
export const getPurchases = (state: State) => state.purchases;
export const getIds = (state: State) => state.ids;
export const getPageInfo = (state: State) => state.pageInfo;
import * as Actions from '../purchases.actions';
import { PurchaseModel } from '../../src/PurchaseModel';

import * as fromProducts from '../../../products/store/reducers/products.reducers';
import { PageInfo } from '../../../src/PageInfo';
import { INameId } from '../../../src/INameId';
import { ContactModel } from '../../src/ContactModel';
import { ProductModel } from '../../../products/src/ProductModel';
import { DeliveryStatus } from '../../../deliveries/src/DeliveryStatus';
import { PurchaseUnitModel } from '../../../src/PurchaseUnit';
import { ReturnPurchaseModel } from '../../../return-purchases/src/ReturnPurchaseModel';
import { PurchaseDeliveryModel } from '../../src/PurchaseDeliveryModel';

export interface State{
    ids: string[];
    purchases: {[id: string]: PurchaseModel};
    editedPurchase: PurchaseModel,
    purchaseUnits: PurchaseUnitModel[];
    needDelivery: boolean;
    purchaseDeliveries: PurchaseDeliveryModel[];
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: [],
    purchases: {},
    editedPurchase: null,
    purchaseUnits: [],
    needDelivery: false,
    purchaseDeliveries: [],
    pageInfo: null
}

export function purchasesReducer(state: State = initialState, action: Actions.PurchasesActions): State{
    switch (action.type) {
        case Actions.SET_PURCHASES:
        let purchasesModels: {[id: number] : PurchaseModel} = {};
        const purchases: PurchaseModel[] = [...<PurchaseModel[]>action.payload];
        const newIds = [];
        purchases.forEach(pm => {
            purchasesModels[pm.id] = pm;
            newIds.push(pm.id);
        });
        return {
            ...state,
            ids: newIds,
            purchases: purchasesModels
        };
        case Actions.ADD_PURCHASE:
        if (Object.keys(state.purchases).length < state.pageInfo.itemsPerPage) {
            const newPurchase: {[id: number] : PurchaseModel} = {}; 
            const payload = <PurchaseModel>action.payload;
            
            newPurchase[payload.id] = createPurchaseFromPayload(payload);
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
        oldPurchases[payload.id] = createPurchaseFromPayload(payload.purchase);
        const newPurchases = {...oldPurchases};
        return {
            ...state,
            purchases: newPurchases
        };
        case Actions.SET_EDIT_PURCHASE:
        const purchase = <PurchaseModel>action.payload;      
        const editedPurchase = createPurchaseFromPayload(purchase);
        return {
            ...state,
            editedPurchase: editedPurchase
        };
        case Actions.SET_PURCHASE_UNITS:
        const purchaseProducts = [...<PurchaseUnitModel[]>action.payload];
        const newPurchaseProducts = [];
        purchaseProducts.forEach(p => newPurchaseProducts.push(
            new PurchaseUnitModel(p.id, p.product, p.count, p.storePrice, p.purchaseUnitStatus)
        ));
        return {
            ...state,
            purchaseUnits: newPurchaseProducts
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
        case  Actions.ADD_UNIT_TO_PURCHASE:
        const addedUnit = <PurchaseUnitModel>action.payload;
        const oldProducts = state.purchaseUnits;
        let newUnits: PurchaseUnitModel[];
        let index: number;
        if (oldProducts.some((p, i) => {index = i; return p.product.id === addedUnit.product.id;})) {
            newUnits = changeProductsCount(oldProducts, addedUnit.product.id, 1)
        }
        else{
            const newUnit = new PurchaseUnitModel(addedUnit.id, addedUnit.product, addedUnit.count, addedUnit.storePrice, addedUnit.purchaseUnitStatus);
            newUnits = [...oldProducts, newUnit];
        }
        if (state.editedPurchase) {
            const edP = <PurchaseModel>{...state.editedPurchase, purchaseUnits: newUnits};
            return {
                ...state,
                editedPurchase: edP
            }
        }
        return {
            ...state,
            purchaseUnits: newUnits
        };
        case Actions.DELETE_UNIT_FROM_PURCHASE:
        const products = state.editedPurchase ? [...state.editedPurchase.purchaseUnits] : [...state.purchaseUnits];
        const deletedUnitId = <string>action.payload;
        let purchaseUnits: PurchaseUnitModel[];
        let unitIndex: number;
        if (products.some((p, i) => {unitIndex = i; return p.product.id === deletedUnitId && p.count > 1;})) {
            purchaseUnits = changeProductsCount(products, deletedUnitId, -1);
        }
        else{
            const filteredUnits = products.filter(p => p.product.id !== deletedUnitId);
            purchaseUnits = [...filteredUnits];
        }
        if (state.editedPurchase) {
            const edP = <PurchaseModel>{...state.editedPurchase, purchaseUnits: purchaseUnits};
            return {
                ...state,
                editedPurchase: edP
            }
        }
        return {
            ...state,
            purchaseUnits: purchaseUnits
        };
        case Actions.CLEAR_PURCHASE_UNITS:
        return {
            ...state,
            purchaseUnits: []
        };
        case Actions.SET_PURCHASE_DELIVERIES:
        const purchaseDeliveries = [...<PurchaseDeliveryModel[]>action.payload];
        const newPurchDels = [];
        purchaseDeliveries.forEach(d => newPurchDels.push(
            new PurchaseDeliveryModel(d.contacts.map(c => new ContactModel(c.id, c.name, c.phone)), d.date, d.address, d.timeFrom, d.timeTo, d.driver, createDeliveryPurchaseUnits(d.purchaseUnits))));
        return {
            ...state,
            purchaseDeliveries: newPurchDels
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

function changeProductsCount(oldProducts: PurchaseUnitModel[], unitId: string, diff: number){
    let index: number;
    const incrementedProduct = oldProducts.find((p, i) => {
        index = i;
        return p.product.id === unitId
    });
    const newProducts = [...oldProducts];
    if (incrementedProduct) {
        const changedProduct = new PurchaseUnitModel(incrementedProduct.id, incrementedProduct.product, incrementedProduct.count + diff, incrementedProduct.storePrice, incrementedProduct.purchaseUnitStatus);
        newProducts[index] = changedProduct;
    }

    return newProducts;
}

function createDeliveryPurchaseUnits(units: PurchaseUnitModel[]): PurchaseUnitModel[]{
    let newUnits = [];
    if (units) {
        units.map(u => new PurchaseUnitModel(u.id, u.product, u.count, u.storePrice, u.purchaseUnitStatus));        
    }

    return newUnits;
}

function createPurchaseFromPayload(payload: PurchaseModel): PurchaseModel{
    const pUnits = [];
    if (payload.purchaseUnits && payload.purchaseUnits.length > 0) {
        let payloadUnits = [...payload.purchaseUnits];
        payloadUnits.forEach(pu => pUnits.push(new PurchaseUnitModel(pu.id, pu.product, pu.count, pu.storePrice, pu.purchaseUnitStatus)));
    }

    const pDeliveries = [];
    const payloadDeliveries = [...payload.deliveries];

    if (payloadDeliveries && payloadDeliveries.length > 0) {
        payloadDeliveries.forEach(d => {
            const dUnits = [];
            if (d.purchaseUnits && d.purchaseUnits.length > 0) {
                const delPUnits = [...d.purchaseUnits];
                delPUnits.forEach(pu => dUnits.push(new PurchaseUnitModel(pu.id, pu.product, pu.count, pu.storePrice, pu.purchaseUnitStatus)));
            }

            pDeliveries.push(new PurchaseDeliveryModel(d.contacts, new Date(d.date), d.address, d.timeFrom, d.timeTo, d.driver, dUnits));
        });
    }

    return new PurchaseModel(payload.id, new Date(payload.date), pUnits, pDeliveries);
}

export const getPurchases = (state: State) => state.purchases;
export const getPurchaseDeliveries = (state: State) => state.purchaseDeliveries;
export const getNeedDelivery = (state: State) => state.needDelivery;
export const getPurchaseUnits = (state: State) => state.purchaseUnits;
export const getEditedPurchase = (state: State) => state.editedPurchase;
export const getEditedPurchaseUnits = (state: State) => state.editedPurchase.purchaseUnits;
export const getEditedPurchaseDeliveries = (state: State) => state.editedPurchase.deliveries;
export const getIds = (state: State) => state.ids;
export const getPageInfo = (state: State) => state.pageInfo;
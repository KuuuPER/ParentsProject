import * as ProductsActions from '../products.actions';
import { ProductModel } from '../../src/ProductModel';
import * as fromApp from '../../../../../store/app.reducers';
import { PageInfo } from '../../../src/PageInfo';
import { INameId } from '../../../src/INameId';
import { ProductState } from '../../src/ProductState';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface State{
    ids: string[],
    products: {[id: string]: ProductModel},
    editedProduct: ProductModel,    
    pageInfo: PageInfo
}

const initialState: State = {
    ids: [],
    products: {},
    editedProduct: null,
    pageInfo: null
}

export function productsReducer(state: State = initialState, action: ProductsActions.ProductsActions): State{
    switch (action.type) {
        case ProductsActions.SET_PRODUCTS:
        const payloads = <ProductModel[]>action.payload;
        const fetchedProducts: {[id: string]: ProductModel} = {};
        const idsArray = [];
        payloads.forEach(p => {fetchedProducts[p.id] = p});
        payloads.forEach(p => idsArray.push(p.id));
        return {
            ...state,
            ids: [...idsArray],
            products: {...fetchedProducts}
        };
        case ProductsActions.ADD_PRODUCT:
        if (Object.keys(state.products).length < state.pageInfo.itemsPerPage) {
            const payload = <ProductModel>action.payload;
            let newProducts: {[id: string]: ProductModel} = {...state.products};
            newProducts[payload.id] = <ProductModel>payload;
            return{
                ...state,
                products: {
                    ...newProducts
                }
            };            
        }
        else{
            return {
                ...state
            };
        }
        case ProductsActions.EDIT_PRODUCT:
        const payload = <{product: ProductModel, id: string}>action.payload;
        const productToUpdate = {
            ...state.products[payload.id],
            ...payload.product
        };
        const products = {...state.products};
        products[payload.id] = <ProductModel>productToUpdate;
        const newProducts = {...products};
        return {
            ...state,
            products: newProducts
        };
        case ProductsActions.DELETE_PRODUCT:
        const id = <string>action.payload;
        const oldState = {...state};
        delete oldState.products[id];
        const ids = oldState.ids.filter(i => i !== id);
        return {
            ...state,
            ids: [...ids],
            products: {...oldState.products},
        };
        case ProductsActions.INCREMENT_COUNT:
        const editedProductId = <string>action.payload;
        const incrementProduct = <ProductModel>state.products[editedProductId];
        const incrementedProduct = <ProductModel>{...incrementProduct, count: (incrementProduct.count + 1)};
        const notIncrementedProducts = <{[id: string]: ProductModel}>{...state.products};
        notIncrementedProducts[editedProductId] = incrementedProduct;
        return {
            ...state,
            products: {...notIncrementedProducts}
        };
        case ProductsActions.DECREMENT_COUNT:
        const decrementProductId = <string>action.payload;
        const decrementProduct = <ProductModel>state.products[decrementProductId];
        const decrementedProduct = <ProductModel>{...decrementProduct, count: (decrementProduct.count - 1)};
        const notDecrementedProducts = <{[id: string]: ProductModel}>{...state.products};
        notDecrementedProducts[decrementProductId] = decrementedProduct;
        return {
            ...state,
            products: {...notDecrementedProducts}
        };
        case ProductsActions.SET_PRODUCTS_COUNT:
        const data = <{count: number, id: string}>action.payload;
        const count = data.count;
        const editedCountProduct = <ProductModel>state.products[data.id];
        const newProduct = <ProductModel>{...editedCountProduct, count: count};
        const oldProducts = <{[id: string]: ProductModel}>{...state.products};
        oldProducts[data.id] = newProduct;
        return {
            ...state,
            products: {...oldProducts}
        };
        case ProductsActions.SET_EDIT_PRODUCT:
        let editedProduct = <ProductModel>action.payload;
        return {
            ...state,
            editedProduct: <ProductModel>{...editedProduct}
        };
        case ProductsActions.SET_PAGEINFO:
        const pageInfo = <PageInfo>action.payload;
        const newInfo = new PageInfo(pageInfo.itemsPerPage, pageInfo.itemsCount, pageInfo.currentPage);
        return {
            ...state,
            pageInfo: newInfo
        };
        default:
            return state;
    }
}

export const getProducts = (state: State) => state.products;
export const getEditProduct = (state: State) => state.editedProduct;
export const getIds = (state: State) => state.ids;
export const getPageInfo = (state: State) => state.pageInfo;
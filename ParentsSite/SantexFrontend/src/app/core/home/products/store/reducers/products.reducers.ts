import * as ProductsActions from '../products.actions';
import { ProductModel } from '../../src/ProductModel';
import * as fromApp from '../../../../../store/app.reducers';
import { PageInfo } from '../../../src/PageInfo';
import { INameId } from '../../../src/INameId';
import { ProductState } from '../../src/ProductState';

export interface State{
    ids: string[],
    products: {[id: string]: ProductModel};
    pageInfo: PageInfo;
}

const initialState: State = {
    ids: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    products: {
        '0': new ProductModel('0', 'Продукт 1', '123456', { id: '1', name: 'Категория 1'}, { id: '1', name: 'Производитель 1' }, { id: '1', name: 'Поставщик 1' }, 1, 1000, 1300, null, ProductState.InStock),
        '1': new ProductModel('1', 'Продукт 2', '123456', { id: '2', name: 'Категория 2'}, { id: '2', name: 'Производитель 2' }, { id: '2', name: 'Поставщик 2' }, 2, 1000, 1300, null, ProductState.InStock),
        '2': new ProductModel('2', 'Продукт 3', '123456', { id: '3', name: 'Категория 3'}, { id: '3', name: 'Производитель 3' }, { id: '3', name: 'Поставщик 3' }, 3, 1000, 1300, null, ProductState.InStock),
        '3': new ProductModel('3', 'Продукт 4', '123456', { id: '1', name: 'Категория 1'}, { id: '1', name: 'Производитель 1' }, { id: '1', name: 'Поставщик 1' }, 4, 1000, 1300, null, ProductState.InStock),
        '4': new ProductModel('4', 'Продукт 5', '123456', { id: '2', name: 'Категория 2'}, { id: '2', name: 'Производитель 2' }, { id: '2', name: 'Поставщик 2' }, 5, 1000, 1300, null, ProductState.InStock),
        '5': new ProductModel('5', 'Продукт 6', '123456', { id: '3', name: 'Категория 3'}, { id: '3', name: 'Производитель 3' }, { id: '3', name: 'Поставщик 3' }, 6, 1000, 1300, null, ProductState.InStock),
        '6': new ProductModel('6', 'Продукт 7', '123456', { id: '1', name: 'Категория 1'}, { id: '1', name: 'Производитель 1' }, { id: '1', name: 'Поставщик 1' }, 7, 1000, 1300, null, ProductState.InStock),
        '7': new ProductModel('7', 'Продукт 8', '123456', { id: '2', name: 'Категория 2'}, { id: '2', name: 'Производитель 2' }, { id: '2', name: 'Поставщик 2' }, 7, 1000, 1300, null, ProductState.InStock),
        '8': new ProductModel('8', 'Продукт 9', '123456', { id: '3', name: 'Категория 3'}, { id: '3', name: 'Производитель 3' }, { id: '3', name: 'Поставщик 3' }, 8, 1000, 1300, null, ProductState.InStock),
        '9': new ProductModel('9', 'Продукт 10', '123456', { id: '1', name: 'Категория 1'}, { id: '1', name: 'Производитель 1' }, { id: '1', name: 'Поставщик 1' }, 9, 1000, 1300, null, ProductState.InStock),
        '10': new ProductModel('10', 'Продукт 11', '123456', { id: '2', name: 'Категория 2'}, { id: '2', name: 'Производитель 2' }, { id: '2', name: 'Поставщик 2' }, 10, 1000, 1300, null, ProductState.InStock),
        '11': new ProductModel('11', 'Продукт 12', '123456', { id: '3', name: 'Категория 3'}, { id: '3', name: 'Производитель 3' }, { id: '3', name: 'Поставщик 3' }, 11, 1000, 1300, null, ProductState.InStock),
    },
    pageInfo: new PageInfo(14, 110, 4)
}

export function productsReducer(state: State = initialState, action: ProductsActions.ProductsActions){
    switch (action.type) {
        case ProductsActions.SET_PRODUCTS:
        let productModels: {[id: string]: ProductModel} = {};
        (<ProductModel[]>action.payload).forEach(pm => productModels[pm.id] = pm);
        return {
            ...state,
            products: productModels
        };
        case ProductsActions.ADD_PRODUCT:
        debugger;
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
        case ProductsActions.PREVIOUS_PAGE:
        case ProductsActions.NEXT_PAGE:
        const newCurrentPage = <number>action.payload;
        return {
            ...state,
            currentPage: newCurrentPage
        };
        default:
            return state;
    }
}

export const getProducts = (state: State) => state.products;
export const getIds = (state: State) => state.ids;
export const getPageInfo = (state: State) => state.pageInfo;
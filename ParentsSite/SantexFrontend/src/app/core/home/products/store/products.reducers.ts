import * as ProductsActions from './products.actions';
import { ProductModel } from '../src/ProductModel';
import * as fromApp from '../../../../store/app.reducers';
import { PageInfo } from '../../src/PageInfo';

export interface FeatureState extends fromApp.AppState {
    products: State;
}

export interface State{
    products: ProductModel[];
    categories: {Id: string, name: string}[];
    manufactures: {Id: string, name: string}[];
    providers: {Id: string, name: string}[];
    pageInfo: PageInfo;
}

const initialState: State = {
    products: [
        new ProductModel('1', 'Продукт 1', 'Категория 1', 'Производитель 1', 'Поставщик 1', 1),
        new ProductModel('2', 'Продукт 2', 'Категория 2', 'Производитель 2', 'Поставщик 2', 2),
        new ProductModel('3', 'Продукт 3', 'Категория 3', 'Производитель 3', 'Поставщик 3', 3),
        new ProductModel('4', 'Продукт 4', 'Категория 1', 'Производитель 1', 'Поставщик 1', 4),
        new ProductModel('5', 'Продукт 5', 'Категория 2', 'Производитель 2', 'Поставщик 2', 5),
        new ProductModel('6', 'Продукт 6', 'Категория 3', 'Производитель 3', 'Поставщик 3', 6),
        new ProductModel('7', 'Продукт 7', 'Категория 1', 'Производитель 1', 'Поставщик 1', 7),
        new ProductModel('8', 'Продукт 8', 'Категория 2', 'Производитель 2', 'Поставщик 2', 7),
        new ProductModel('9', 'Продукт 9', 'Категория 3', 'Производитель 3', 'Поставщик 3', 8),
        new ProductModel('10', 'Продукт 10', 'Категория 1', 'Производитель 1', 'Поставщик 1', 9),
        new ProductModel('11', 'Продукт 11', 'Категория 2', 'Производитель 2', 'Поставщик 2', 10),
        new ProductModel('12', 'Продукт 12', 'Категория 3', 'Производитель 3', 'Поставщик 3', 11),
    ],
    categories: [{Id: '1', name: 'Категория 1'}, {Id: '2', name: 'Категория 2'}, {Id: '3', name: 'Категория 3'}],
    manufactures: [{Id: '1', name: 'Производитель 1'}, {Id: '2', name: 'Производитель 2'}, {Id: '3', name: 'Производитель 3'}],
    providers: [{Id: '1', name: 'Поставщик 1'}, {Id: '2', name: 'Поставщик 2'}, {Id: '3', name: 'Поставщик 3'}],
    pageInfo: new PageInfo(10, 110, 4)
}

export function productsReducer(state: State = initialState, action: ProductsActions.ProductsActions){
    switch (action.type) {
        case ProductsActions.SET_PRODUCTS:
        return {
            ...state,
            products: [...(<ProductModel[]>action.payload)]
        };
        case ProductsActions.ADD_PRODUCT:
        if (state.products.length < state.pageInfo.itemsPerPage) {
            return{
                ...state,
                products: [
                    ...state.products,
                    <ProductModel>action.payload
                ]
            };            
        }
        else{
            return {
                ...state
            };
        }
        case ProductsActions.EDIT_PRODUCT:
        const payload = <{product: ProductModel, index: number}>action.payload;
        const productToUpdate = {
            ...state[payload.index],
            ...payload.product
        };
        const products = [...state.products];
        products[payload.index] = productToUpdate;
        const newProducts = [...products];
        return {
            ...state,
            products: newProducts
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
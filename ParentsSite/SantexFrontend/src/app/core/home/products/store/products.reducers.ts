import * as ProductsActions from './products.actions';
import { ProductModel } from '../src/ProductModel';
import * as fromApp from '../../../../store/app.reducers';
import { PageInfo } from '../../src/PageInfo';
import { INameId } from '../../src/INameId';

export interface FeatureState extends fromApp.AppState {
    products: State;
}

export interface State{
    products: ProductModel[];
    categories: INameId[];
    manufactures: INameId[];
    providers: INameId[];
    pageInfo: PageInfo;
}

const initialState: State = {
    products: [
        new ProductModel('1', 'Продукт 1', '123456', { Id: '1', Name: 'Категория 1'}, { Id: '1', Name: 'Производитель 1' }, { Id: '1', Name: 'Поставщик 1' }, 1, 1000, 1300),
        new ProductModel('2', 'Продукт 2', '123456', { Id: '2', Name: 'Категория 2'}, { Id: '2', Name: 'Производитель 2' }, { Id: '2', Name: 'Поставщик 2' }, 2, 1000, 1300),
        new ProductModel('3', 'Продукт 3', '123456', { Id: '3', Name: 'Категория 3'}, { Id: '3', Name: 'Производитель 3' }, { Id: '3', Name: 'Поставщик 3' }, 3, 1000, 1300),
        new ProductModel('4', 'Продукт 4', '123456', { Id: '1', Name: 'Категория 1'}, { Id: '1', Name: 'Производитель 1' }, { Id: '1', Name: 'Поставщик 1' }, 4, 1000, 1300),
        new ProductModel('5', 'Продукт 5', '123456', { Id: '2', Name: 'Категория 2'}, { Id: '2', Name: 'Производитель 2' }, { Id: '2', Name: 'Поставщик 2' }, 5, 1000, 1300),
        new ProductModel('6', 'Продукт 6', '123456', { Id: '3', Name: 'Категория 3'}, { Id: '3', Name: 'Производитель 3' }, { Id: '3', Name: 'Поставщик 3' }, 6, 1000, 1300),
        new ProductModel('7', 'Продукт 7', '123456', { Id: '1', Name: 'Категория 1'}, { Id: '1', Name: 'Производитель 1' }, { Id: '1', Name: 'Поставщик 1' }, 7, 1000, 1300),
        new ProductModel('8', 'Продукт 8', '123456', { Id: '2', Name: 'Категория 2'}, { Id: '2', Name: 'Производитель 2' }, { Id: '2', Name: 'Поставщик 2' }, 7, 1000, 1300),
        new ProductModel('9', 'Продукт 9', '123456', { Id: '3', Name: 'Категория 3'}, { Id: '3', Name: 'Производитель 3' }, { Id: '3', Name: 'Поставщик 3' }, 8, 1000, 1300),
        new ProductModel('10', 'Продукт 10', '123456', { Id: '1', Name: 'Категория 1'}, { Id: '1', Name: 'Производитель 1' }, { Id: '1', Name: 'Поставщик 1' }, 9, 1000, 1300),
        new ProductModel('11', 'Продукт 11', '123456', { Id: '2', Name: 'Категория 2'}, { Id: '2', Name: 'Производитель 2' }, { Id: '2', Name: 'Поставщик 2' }, 10, 1000, 1300),
        new ProductModel('12', 'Продукт 12', '123456', { Id: '3', Name: 'Категория 3'}, { Id: '3', Name: 'Производитель 3' }, { Id: '3', Name: 'Поставщик 3' }, 11, 1000, 1300),
    ],
    categories: [{Id: '1', Name: 'Категория 1'}, {Id: '2', Name: 'Категория 2'}, {Id: '3', Name: 'Категория 3'}, {Id: '4', Name: 'Категория 4'}, {Id: '4', Name: 'Категория 5'}],
    manufactures: [{Id: '1', Name: 'Производитель 1'}, {Id: '2', Name: 'Производитель 2'}, {Id: '3', Name: 'Производитель 3'}],
    providers: [{Id: '1', Name: 'Поставщик 1'}, {Id: '2', Name: 'Поставщик 2'}, {Id: '3', Name: 'Поставщик 3'}],
    pageInfo: new PageInfo(14, 110, 4)
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
            ...state.products[payload.index],
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
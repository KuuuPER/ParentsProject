import * as Actions from '../imports.actions';
import { ImportModel } from '../../src/ImportModel';

import * as fromApp from '../../../../../store/app.reducers';
import * as fromProducts from '../../../products/store/reducers/products.reducers';
import { PageInfo } from '../../../src/PageInfo';
import { INameId } from '../../../src/INameId';
import { ProviderModel } from '../../../providers/src/ProviderModel';
import { ImportStatus } from '../../src/ImportStatus';
import { ImportProductModel } from '../../src/ImportProductModel';
import { ProductModel } from '../../../products/src/ProductModel';

export interface State{
    ids: string[],
    imports: {[id: string]: ImportModel};
    editImport: ImportModel;
    importProducts: ProductModel[];
    pageInfo: PageInfo;
    productsPageInfo: PageInfo;
}

const initialState: State = {
    ids: [],
    imports: {},
    editImport: null,
    importProducts: [],
    pageInfo: null,
    productsPageInfo: null
}

export function importsReducer(state: State = initialState, action: Actions.ImportActions): State{
    switch (action.type) {
        case Actions.SET_IMPORTS:
        if (action.payload && Object.keys(action.payload).length > 0) {
            let importModels: {[id: string]: ImportModel} = {};
            let curPayload = <ImportModel[]>action.payload;
            let payloadArray = [...curPayload];
            let ids = payloadArray.map(i => i.id);
            payloadArray.forEach((im) => importModels[im.id] = new ImportModel(im.id, im.provider, im.products, im.createdDate, im.importDate, im.finishDate, im.status));
            return {
                ...state,
                ids: [...ids],
                imports: importModels
            };
        }
        return state;
        case Actions.ADD_IMPORT:
        if (Object.keys(state.imports).length < state.pageInfo.itemsPerPage) {
            const payload = <ImportModel>action.payload;
            let newImports: {[id: string]: ImportModel} = {...state.imports};
            newImports[payload.id] = payload; 
            return{
                ...state,
                imports: {
                    ...newImports
                }
            };            
        }
        else{
            return {
                ...state
            };
        }
        case Actions.EDIT_IMPORT:
        const payload = <{import: ImportModel, id: string}>action.payload;
        const importToUpdate = {
            ...state.imports[payload.id],
            ...payload.import
        };
        const imports = {...state.imports};
        imports[payload.id] = <ImportModel>importToUpdate;
        return {
            ...state,
            imports: {...imports}
        };
        case Actions.DELETE_IMPORT:
        const id = <string>action.payload;
        const oldState = {...state};
        delete oldState.imports[id];
        const ids = oldState.ids.filter(i => i !== id);
        return {
            ...state,
            ids: [...ids],
            imports: {...oldState.imports},
        };
        case Actions.SET_EDIT_IMPORT:
        const editImport = <ImportModel>action.payload;
        const newEditImport = new ImportModel(editImport.id, editImport.provider, editImport.products, editImport.createdDate, editImport.importDate, editImport.finishDate, editImport.status);        return {
            ...state,
            editImport: newEditImport
        }
        case Actions.SET_IMPORT_PRODUCTS:
        const importProducts = [...<{product: ProductModel, count: number}[]>action.payload];
        const currentImport = state.editImport;
        const newImportProducts = <ProductModel[]>importProducts.map(p => new ProductModel(p.product.id, p.product.name, p.product.vendorCode, p.product.category, p.product.manufacture, p.product.provider, p.count, p.product.providerPrice, p.product.storePrice, p.product.description));
        return {
            ...state,
            importProducts: [...newImportProducts]
        };
        case Actions.CLEAR_IMPORT_PRODUCTS:
        return {
            ...state,
            importProducts: []
        };
        case Actions.ADD_IMPORT_PRODUCT:
        const addedProduct = <ProductModel>action.payload;
        const withoutNewProduct = <ProductModel[]>[...state.importProducts];
        if (withoutNewProduct.some(p => p.id === addedProduct.id)) {
            const existedProduct = withoutNewProduct.find(p => p.id === addedProduct.id);
            const newProduct = <ProductModel>{...existedProduct};
            newProduct.count++;
            const withNewProduct = [...withoutNewProduct.filter(p => p.id !== existedProduct.id), newProduct];
            return setNewProducts(state, <ProductModel[]>withNewProduct);
        }
        else{
            const newProduct = <ProductModel>{...addedProduct};
            newProduct.count = 1;
            const withNewProduct = [...withoutNewProduct, {...newProduct}];
            return setNewProducts(state, <ProductModel[]>withNewProduct);
        }
        case Actions.DELETE_IMPORT_PRODUCT:
        const deleteProductId = <string>action.payload;
        const withDeletedProduct = <ProductModel[]>state.importProducts;
        if (withDeletedProduct.some(p => p.id === deleteProductId)) {
            let p = withDeletedProduct.find(p => p.id === deleteProductId);
            if(p.count > 1)
            {
                p.count--;            
                return setNewProducts(state, <ProductModel[]>withDeletedProduct);
            }
            else{
                const withoutDeletedProduct = (<ProductModel[]>state.importProducts).filter(p => p.id !== deleteProductId);
                return setNewProducts(state, <ProductModel[]>[...withoutDeletedProduct]);
            }
        }
        case Actions.INCREMENT_IMPORT_PRODUCT:
        const incrementProductId = <string>action.payload;
        const notIncrementedProducts = <ProductModel[]>state.importProducts;
        const incrementedProducts = <ProductModel[]>[...notIncrementedProducts];
        if (incrementedProducts.some(p => p.id === incrementProductId)) {
            incrementedProducts.find(p => p.id === incrementProductId).count++;
            return setNewProducts(state, <ProductModel[]>incrementedProducts);
        }
        else{
            return setNewProducts(state, <ProductModel[]>incrementedProducts);
        }
        case Actions.DECREMENT_IMPORT_PRODUCT:
        const decrementProductId = <string>action.payload;
        const notDecrementedProducts = <ProductModel[]>state.importProducts;
        const decrementedProducts = <ProductModel[]>[...notDecrementedProducts];
        decrementedProducts.find(p => p.id === decrementProductId).count++;
        return setNewProducts(state, <ProductModel[]>decrementedProducts);
        case Actions.SET_PRODUCTS_PAGEINFO:
        const productsPageInfo = <PageInfo>action.payload;
        const newProductsPageInfo = new PageInfo(productsPageInfo.itemsPerPage, productsPageInfo.itemsCount, productsPageInfo.currentPage);
        return {
            ...state,
            productsPageInfo: newProductsPageInfo
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

function setNewProducts(currentState: State, products: ProductModel[]): State{
        return {
            ...currentState,
            importProducts: [...products]
        };
}

export const getImports = (state: State) => state.imports;
export const getEditImport = (state: State) => state.editImport;
export const getEditImportProducts = (state: State) => state.editImport.products;
export const getIds = (state: State) => state.ids;
export const getImportProducts = (state: State) => state.importProducts;
export const getProductsPageInfo = (state: State) => state.productsPageInfo;
export const getPageInfo = (state: State) => state.pageInfo;
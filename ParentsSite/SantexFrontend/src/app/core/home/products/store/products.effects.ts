import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import * as fromReducers from './reducers';
import * as ProductsActions from './products.actions';
import * as InfoActions from '../../info/store/info.actions';
import { ProductModel } from "../src/ProductModel";
import { Router, ActivatedRoute } from "@angular/router";
import { InfoModel } from "../../src/InfoModel";
import { InfoTypes } from "../../src/InfoTypes";
import { PageInfo } from "../../src/PageInfo";
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ProductsEffects{
    private productsUrl: string = environment.baseUrl + 'Products';

    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromReducers.FeatureState>,
        private route: ActivatedRoute,
        private router: Router){}

    @Effect()
    productsFetch = this.actions$
    .ofType(ProductsActions.FETCH_PRODUCTS)    
    .switchMap((action: ProductsActions.FetchProducts) =>
    {
        let params = new HttpParams();
        if (action.payload) {
            params = params.append('currentPage', action.payload.currentPage.toString());
            params = params.append('itemsCount', action.payload.itemsCount.toString());
            params = params.append('itemsPerPage', action.payload.itemsPerPage.toString());
        }        

        return this.httpClient.get<ProductModel[]>(this.productsUrl, { params: params });
    })
    .mergeMap((response: any) => {
        let products = <ProductModel[]>response.entities;
        let pageInfo = <PageInfo>response.pageInfo;
        return [{
            payload: products === null ? {} : products,
            type: ProductsActions.SET_PRODUCTS
        },
        {
            payload: pageInfo,
            type: ProductsActions.SET_PAGEINFO
        }
    ];
    });

    @Effect()
    getProduct = this.actions$
    .ofType(ProductsActions.GET_PRODUCT)
    .switchMap((action: ProductsActions.GetProduct) => 
    {
      return this.httpClient.get<ProductModel>(this.productsUrl + '/' + action.payload);
    })
    .map((response: ProductModel) => {
        return {
            payload: response,
            type: ProductsActions.SET_EDIT_PRODUCT
        }
    });

    @Effect()
    addProduct = this.actions$
    .ofType(ProductsActions.ADD_PRODUCT)
    .switchMap((action: ProductsActions.AddProduct) => {
        return this.httpClient.post(this.productsUrl, action.payload).take(1);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/products']);

            return{
                payload: new InfoModel('✔ Успешно!', 'Категория успешно добавлена.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
        else{
            return{
                payload: new InfoModel('✘ Ошибка!', response.desc, InfoTypes.Error),
                type: InfoActions.SHOW_ERROR
            };
        }
    });

    @Effect()
    updateProduct = this.actions$
    .ofType(ProductsActions.EDIT_PRODUCT)
    .switchMap((action: ProductsActions.EditProduct) => {
        return this.httpClient.put(this.productsUrl, action.payload.product).take(1);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/products']);
            return{
                payload: new InfoModel('✔ Успешно!', 'Категория успешно добавлена.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
    });

    @Effect()
    deleteProduct = this.actions$
    .ofType(ProductsActions.DELETE_PRODUCT)
    .switchMap((action: ProductsActions.DeleteProduct) => {
        return this.httpClient.delete(this.productsUrl + '?id='+action.payload)
    })
    .map((response: any) => {
        this.router.navigate(['/home/products']);
        if (response.code === 'ok') {
            return {
                payload: new InfoModel('✔ Успешно!', 'Успешно пидорнули.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
        else {
            return {
                payload: new InfoModel('✘ Хуёво!', 'Хуёво пидорнули.', InfoTypes.Error),
                type: InfoActions.SHOW_INFO                 
            };
        }
    });
}
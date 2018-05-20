import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import * as fromReducers from './reducers';
import * as ImportsActions from './imports.actions';
import * as ProductsActions from '../../products/store/products.actions';
import * as InfoActions from '../../info/store/info.actions';
import { ImportModel } from "../src/ImportModel";
import { Router, ActivatedRoute } from "@angular/router";
import { InfoModel } from "../../src/InfoModel";
import { InfoTypes } from "../../src/InfoTypes";
import { HttpParams } from "@angular/common/http";
import { PageInfo } from "../../src/PageInfo";
import { ProductModel } from "../../products/src/ProductModel";
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ImportsEffects{
    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromReducers.FeatureState>,
        private route: ActivatedRoute,
        private router: Router){}

    private importsUrl: string = environment.baseUrl + 'import';
        
    @Effect()
    importsFetch = this.actions$
    .ofType(ImportsActions.FETCH_IMPORTS)
    .switchMap((action: ImportsActions.FetchImports) =>
    {
        let params = new HttpParams();
        if(action.payload){
            params = params.append('currentPage', action.payload.currentPage.toString());
            params = params.append('itemsCount', action.payload.itemsCount.toString());
            params = params.append('itemsPerPage', action.payload.itemsPerPage.toString());
        }

        return this.httpClient.get<ImportModel[]>(this.importsUrl, { params: params });
    })
    .mergeMap((response: any) => {
        let imports = <ImportModel[]>response.data.entities;
        let pageInfo = <PageInfo>response.data.pageInfo;
        return [{
            payload: imports === null ? {} : imports,
            type: ImportsActions.SET_IMPORTS
        },
        {
            payload: pageInfo,
            type: ImportsActions.SET_PAGEINFO
        }];
    });

    @Effect()
    ClearImportProducts = this.actions$
    .ofType(ImportsActions.CLEAR_IMPORT_PRODUCTS)
    .map(() => {
        return {
            payload: null,
            type: ProductsActions.FETCH_PRODUCTS
        }
    });

    @Effect()
    importProductsFetch = this.actions$
    .ofType(ImportsActions.FETCH_IMPORT_PRODUCTS)    
    .switchMap((action: ImportsActions.FetchImportProducts) =>
    {
        let params = new HttpParams();
        let pageInfo = action.payload.pageInfo;
        let importId = action.payload.importId;
        params = params.append('currentPage', pageInfo.currentPage.toString());
        params = params.append('itemsCount', pageInfo.itemsCount.toString());
        params = params.append('itemsPerPage', pageInfo.itemsPerPage.toString());

        return this.httpClient.get<ProductModel[]>(this.importsUrl + '/products/' + importId, { params: params });
    })
    .take(1)
    .mergeMap((response: any) => {
        if (response.code === 'ok') {
            let products = <ProductModel[]>response.data.entities;
            let pageInfo = <PageInfo>response.data.pageInfo;
            return [{
                payload: products === null ? {} : products,
                type: ImportsActions.SET_IMPORT_PRODUCTS
            },
            {
                payload: pageInfo,
                type: ImportsActions.SET_PRODUCTS_PAGEINFO
            }];
        }
        else{
            return[{
                payload: new InfoModel('✘ Ошибка!', response.desc, InfoTypes.Error),
                type: InfoActions.SHOW_ERROR
            }];
        }
    });

    @Effect()
    getImport = this.actions$
    .ofType(ImportsActions.GET_IMPORT)
    .switchMap((action: ImportsActions.GetImport) => 
    {
      return this.httpClient.get<ImportModel>(this.importsUrl + '/' + action.payload);
    })
    .take(1)
    .map((response: any) => {
        if(response.code === 'ok'){
            return {
                payload: response.data,
                type: ImportsActions.SET_EDIT_IMPORT
            }
        }
    });

    @Effect()
    addImport = this.actions$
    .ofType(ImportsActions.ADD_IMPORT)
    .switchMap((action: ImportsActions.AddImport) => {
        debugger;
        return this.httpClient.post(this.importsUrl, action.payload).take(1);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/imports']);

            return{
                payload: new InfoModel('✔ Успешно!', 'Приход успешно добавлена.', InfoTypes.Success),
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
    updateImport = this.actions$
    .ofType(ImportsActions.EDIT_IMPORT)
    .switchMap((action: ImportsActions.EditImport) => {
        debugger;
        return this.httpClient.put(this.importsUrl, action.payload.import).take(1);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/imports']);
            return{
                payload: new InfoModel('✔ Успешно!', 'Приход успешно изменён.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
    });

    @Effect()
    deleteImport = this.actions$
    .ofType(ImportsActions.DELETE_IMPORT)
    .switchMap((action: ImportsActions.DeleteImport) => {
        return this.httpClient.delete(this.importsUrl + '?id='+action.payload)
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            return{
                payload: new InfoModel('✔ Успешно!', 'Успешно пидорнули.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
        else{
            return{
                payload: new InfoModel('✘ Хуёво!', 'Хуёво пидорнули.', InfoTypes.Error),
                type: InfoActions.SHOW_INFO
            };
        }
    });
}
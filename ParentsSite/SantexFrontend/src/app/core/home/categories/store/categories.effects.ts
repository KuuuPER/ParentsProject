import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import * as fromReducers from './reducers';
import * as CategoriesActions from './categories.actions';
import * as InfoActions from '../../info/store/info.actions';
import { CategoryModel } from "../src/CategoryModel";
import { Router, ActivatedRoute } from "@angular/router";
import { InfoModel } from "../../src/InfoModel";
import { InfoTypes } from "../../src/InfoTypes";
import { HttpParams } from "@angular/common/http";
import { PageInfo } from "../../src/PageInfo";
import { environment } from '../../../../../environments/environment';

@Injectable()
export class CategoriesEffects{
    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromReducers.FeatureState>,
        private route: ActivatedRoute,
        private router: Router){}

    private categoriesUrl: string = environment.baseUrl + 'ProductCategories';
        
    @Effect()
    categoriesFetch = this.actions$
    .ofType(CategoriesActions.FETCH_CATEGORIES)
    .switchMap((action: CategoriesActions.FetchCategories) =>
    {
        let params = new HttpParams();
        if(action.payload){
            params = params.append('currentPage', action.payload.currentPage.toString());
            params = params.append('itemsCount', action.payload.itemsCount.toString());
            params = params.append('itemsPerPage', action.payload.itemsPerPage.toString());
        }

        return this.httpClient.get<CategoryModel[]>(this.categoriesUrl, { params: params });
    })
    .mergeMap((response: any) => {
        let categories = <CategoryModel[]>response.entities;
        let pageInfo = <PageInfo>response.pageInfo;
        return [{
            payload: categories === null ? {} : categories,
            type: CategoriesActions.SET_CATEGORIES
        },
        {
            payload: pageInfo,
            type: CategoriesActions.SET_PAGEINFO
        }];
    });

    @Effect()
    getCategory = this.actions$
    .ofType(CategoriesActions.GET_CATEGORY)
    .switchMap((action: CategoriesActions.GetCategory) => 
    {
      return this.httpClient.get<CategoryModel>(this.categoriesUrl + '/' + action.payload);
    })    
    .map((response: CategoryModel) => {
        return {
            payload: response,
            type: CategoriesActions.SET_EDIT_CATEGORY
        }
    });

    @Effect()
    addCategory = this.actions$
    .ofType(CategoriesActions.ADD_CATEGORY)
    .switchMap((action: CategoriesActions.AddCategory) => {
        return this.httpClient.post(this.categoriesUrl, action.payload).take(1);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/categories']);

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
    updateCategory = this.actions$
    .ofType(CategoriesActions.EDIT_CATEGORY)
    .switchMap((action: CategoriesActions.EditCategory) => {
        return this.httpClient.put(this.categoriesUrl, action.payload.category).take(1);
    })
    .map((response: any) => {
        if (response.code === 'ok') {
            this.router.navigate(['/home/categories']);
            return{
                payload: new InfoModel('✔ Успешно!', 'Категория успешно добавлена.', InfoTypes.Success),
                type: InfoActions.SHOW_INFO
            };
        }
    });

    @Effect()
    deleteCategory = this.actions$
    .ofType(CategoriesActions.DELETE_CATEGORY)
    .switchMap((action: CategoriesActions.DeleteCategory) => {
        return this.httpClient.delete(this.categoriesUrl + '?id='+action.payload)
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
import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Store } from "@ngrx/store";

import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

import * as fromReducers from '../store/reducers';
import * as Actions from '../store/categories.actions';
import { CategoryModel } from "../src/CategoryModel";
import { PageInfo } from "../../src/PageInfo";
import { environment } from '../../../../../environments/environment';

@Injectable()
export class CategoriesListService{
    constructor(private router: Router,
        private route: ActivatedRoute,
        private store: Store<fromReducers.FeatureState>) { }
        

    public fetchFirstPage(pageInfo: Observable<PageInfo>){
       pageInfo
        .take(1)
        .subscribe((p) => {
        this.store.dispatch(new Actions.FetchCategories(p));
        });
    }
}
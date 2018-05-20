import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Store } from "@ngrx/store";

import { Observable } from 'rxjs/Observable';

import * as fromReducers from '../store/reducers';
import * as Actions from '../store/categories.actions';
import { Subscription } from "rxjs";
import { CategoryModel } from "../src/CategoryModel";

@Injectable()
export class CategoryService{
    constructor(private router: Router,
        private route: ActivatedRoute,
        private store: Store<fromReducers.FeatureState>) { }

    private id: string;

    public IsEdit(): Observable<{ isEdit: boolean, id: string }>{
        return this.route.params.take(1).map((params: Params) => {
            let result = { isEdit: false, id: '' };
            if (params['id'] !== undefined) {
              result.id = params['id'];
              this.id = result.id;

              result.isEdit = true;
              
              this.store.dispatch(new Actions.GetCategory(result.id));
              return result;
            }
            else{
                result.isEdit = false;

                return result;
            }
          });
    }

    public AddCategory(category: CategoryModel){
        if (this.id) {
            this.store.dispatch(new Actions.EditCategory({category: category, id: this.id}));
        }
        else{
            this.store.dispatch(new Actions.AddCategory(category));
        }
    }

    public Cancel(){
        this.router.navigate(['../'], {relativeTo: this.route});
    }
}
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import * as fromReducers from '../store/reducers';
import * as Actions from '../store/drivers.actions';
import { DriverModel } from "../src/DriverModel";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DriverService{
    constructor(private router: Router,
        private route: ActivatedRoute,
        private store: Store<fromReducers.FeatureState>) { }

    private id: string;

    public IsEdit(){
        return this.route.params.switchMap((params: Params) => {            
            let result = { isEdit: false, id: '' };
            if (params['id'] !== undefined) {
              result.id = params['id'];
              this.id = result.id;

              result.isEdit = true;
              
              this.store.dispatch(new Actions.GetDriver(result.id));              
            }
            else{
                result.isEdit = false;
            }

            return Observable.of(result);
          });
    }

    public addDriver(driver: DriverModel){
        if (this.id) {
            this.store.dispatch(new Actions.EditDriver({driver: driver, id: this.id}));
        }
        else{
            this.store.dispatch(new Actions.AddDriver(driver));
        }
    }

    public moveToList(): void {
        this.router.navigate(['/home/drivers'])
    }
}
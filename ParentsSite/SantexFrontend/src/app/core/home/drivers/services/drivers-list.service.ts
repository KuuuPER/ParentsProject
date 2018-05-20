import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Router, ActivatedRoute } from "@angular/router";

import * as fromReducers from '../store/reducers';
import * as Actions from '../store/drivers.actions';
import { PageInfo } from "../../src/PageInfo";
import { HttpParams, HttpClient } from "@angular/common/http";
import { DriverModel } from "../src/DriverModel";
import { Observable } from "rxjs/Observable";
import { environment } from '../../../../../environments/environment';

@Injectable()
export class DriversListService{
    private driversUrl: string = environment.baseUrl + 'Drivers';

    constructor(private router: Router,
        private route: ActivatedRoute,
        private store: Store<fromReducers.FeatureState>,
        private httpClient: HttpClient) { }
    
    public fetchFirstPage(pageInfo: Observable<PageInfo>){
        pageInfo
             .take(1)
             .subscribe((p) => {
             this.store.dispatch(new Actions.FetchDrivers(p));
        });
    }
    
    public fetchDrivers(pageInfo: PageInfo): Observable<DriverModel[]>{
        let params = new HttpParams();
        if(pageInfo){
            params = params.append('currentPage', pageInfo.currentPage.toString());
            params = params.append('itemsCount', pageInfo.itemsCount.toString());
            params = params.append('itemsPerPage', pageInfo.itemsPerPage.toString());
        }

        return this.httpClient.get<DriverModel[]>(this.driversUrl, { params: params });
    }

    public fetchDriverById(id: string): Observable<DriverModel>{
        return this.httpClient.get<DriverModel>(this.driversUrl + '/' + id);
    }

    public addDriver(driver: DriverModel){
        return this.httpClient.post(this.driversUrl, driver).take(1);
    }

    public editDriver(driver: DriverModel){
        return this.httpClient.put(this.driversUrl, driver).take(1);
    }

    public deleteDriver(id: string){
        return this.httpClient.delete(this.driversUrl + '?id='+id);
    }
}
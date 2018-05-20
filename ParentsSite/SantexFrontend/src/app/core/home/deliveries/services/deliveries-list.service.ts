import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import * as Actions from '../store/deliveries.actions';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { PageInfo } from "../../src/PageInfo";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from '../../../../../environments/environment';

@Injectable()
export class DeliveriesListService{
    constructor(
        public httpClient: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    private url: string = environment.baseUrl + 'Deliveries';

    public fetchDeliveries(pageInfo: PageInfo){
        let params = new HttpParams();
        if(pageInfo){
            params = params.append('currentPage', pageInfo.currentPage.toString());
            params = params.append('itemsCount', pageInfo.itemsCount.toString());
            params = params.append('itemsPerPage', pageInfo.itemsPerPage.toString());
        }

        return this.httpClient.get(this.url, { params: params });
    }
}
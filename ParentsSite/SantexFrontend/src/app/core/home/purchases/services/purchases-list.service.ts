import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import * as fromPurchases from '../store/reducers';
import * as Actions from '../store/purchases.actions';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { PageInfo } from "../../src/PageInfo";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from '../../../../../environments/environment';

@Injectable()
export class PurchasesListService{
    constructor(
        public httpClient: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        public store: Store<fromPurchases.FeatureState>
    ) { }

    private purchasesUrl: string = environment.baseUrl + 'Purchases';

    public fetchFirstPage(pageInfo: Observable<PageInfo>){
        pageInfo
         .take(1)
         .subscribe((p) => {
         this.store.dispatch(new Actions.FetchPurchases(p));
         });
     }

    public fetchPurchases(pageInfo: PageInfo){
        let params = new HttpParams();
        if(pageInfo){
            params = params.append('currentPage', pageInfo.currentPage.toString());
            params = params.append('itemsCount', pageInfo.itemsCount.toString());
            params = params.append('itemsPerPage', pageInfo.itemsPerPage.toString());
        }

        return this.httpClient.get(this.purchasesUrl, { params: params });
    }
}
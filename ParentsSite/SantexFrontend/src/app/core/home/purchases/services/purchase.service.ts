import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import * as fromPurchases from '../store/reducers';
import * as Actions from '../store/purchases.actions';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { PageInfo } from "../../src/PageInfo";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { PurchaseModel } from "../src/PurchaseModel";
import { environment } from '../../../../../environments/environment';

@Injectable()
export class PurchaseService{
    constructor(private httpClient: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<fromPurchases.FeatureState>) { }

    private purchasesUrl: string = environment.baseUrl + 'Purchases';

    public getPurchase(id: string){
        return this.httpClient.get<PurchaseModel>(this.purchasesUrl + '/' + id)
    }

    public getPurchaseDeliveries(pageInfo: PageInfo){
        let params = new HttpParams();
        if(pageInfo){
            params = params.append('currentPage', pageInfo.currentPage.toString());
            params = params.append('itemsCount', pageInfo.itemsCount.toString());
            params = params.append('itemsPerPage', pageInfo.itemsPerPage.toString());
        }

        return this.httpClient.get<PurchaseModel>(this.purchasesUrl + '/Deliveries', {params: params});
    }

    public addPurchase(purchase: PurchaseModel){
        return this.httpClient.post<PurchaseModel>(this.purchasesUrl, purchase).take(1);
    }

    public editPurchase(purchase: PurchaseModel){
        return this.httpClient.put<PurchaseModel>(this.purchasesUrl, purchase).take(1);
    }

    public deletePurchase(id: string){
        return this.httpClient.delete(this.purchasesUrl + '/' + id)
    }

    public moveToList(): void {
        this.router.navigate(['/home/purchases'])
    }
}
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import * as fromDeliveries from '../store/reducers';
import * as Actions from '../store/deliveries.actions';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { PageInfo } from "../../src/PageInfo";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DeliveryModel } from "../src/DeliveryModel";
import { DeliveryPurchaseModel } from "../src/DeliveryPurchaseModel";
import { environment } from '../../../../../environments/environment';

@Injectable()
export class DeliveryService{
    constructor(private httpClient: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<fromDeliveries.FeatureState>) { }

    private url: string = environment.baseUrl + 'Deliveries';

    public getDelivery(id: string){
        return this.httpClient.get<DeliveryModel>(this.url + '/' + id);
    }

    public addDelivery(purchase: DeliveryModel){
        return this.httpClient.post<DeliveryModel>(this.url, purchase).take(1);
    }

    public editDelivery(purchase: DeliveryModel){
        return this.httpClient.put<DeliveryModel>(this.url, purchase).take(1);
    }

    public deleteDelivery(id: string){
        return this.httpClient.delete(this.url + '/' + id);
    }

    public getPurchases(deliveryId: string): Observable<DeliveryPurchaseModel[]>{
        let params = new HttpParams();
        if(deliveryId){
            params = params.append('deliveryId', deliveryId);            
        }

        return this.httpClient.get<DeliveryPurchaseModel[]>(this.url + '/purchases', {params: params}).take(1);
    }

    public moveToList(): void {
        this.router.navigate(['/home/deliveries']);
    }
}
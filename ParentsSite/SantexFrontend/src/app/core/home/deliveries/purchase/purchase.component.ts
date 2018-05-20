import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromReducers from '../store/reducers';
import * as DeliveriesActions from '../store/deliveries.actions';
import { DeliveryPurchaseModel } from '../src/DeliveryPurchaseModel';
import { PurchaseUnitModel } from '../../src/PurchaseUnit';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  animations: [
    trigger('showIn', [
      state('false', style({
        maxHeight: '0',
	      maxWidth: '0',
	      opacity: '0',
	      overflow: 'hidden',
	      whiteSpace:'nowrap',
        })),
      state('true', style({
        maxHeight: '100%',
	      maxWidth: '100%',
	      opacity: '1'
        })),
      transition('false => true', [
        animate(100)
      ]),
      transition('true => false', [
        animate(100)
      ]),
    ],
  ),
  ]
})
export class PurchaseComponent implements OnInit {
  public open: boolean = false;

  @Input()
  public deliveryUnits: Observable<PurchaseUnitModel[]>;

  @Input()
  public purchases: Observable<DeliveryPurchaseModel[]>;

  constructor(private store: Store<fromReducers.FeatureState>) { }

  ngOnInit() {
  }

  addUnitToDelivery(unit: PurchaseUnitModel, purchaseId: string){
    this.store.dispatch(new DeliveriesActions.AddPurchaseUnit({unit: unit, purchaseId: purchaseId}));    
  }

  getUnitCount(unitId: string): Observable<number>{
    return this.deliveryUnits.map(du => {
      var unit = du.find(u => u.id === unitId);
      return unit && unit.count || 0;
    });
  }
}

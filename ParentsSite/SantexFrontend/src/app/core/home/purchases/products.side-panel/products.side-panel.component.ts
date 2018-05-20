import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromReducer from '../store/reducers';
import * as ProductsActions from '../../products/store/products.actions';
import * as Actions from '../store/purchases.actions';
import * as fromSelectors from '../store/reducers/purchases.selectors';
import { ProductModel } from '../../products/src/ProductModel';
import { PurchaseUnitModel } from '../../src/PurchaseUnit';
import { PageInfo } from '../../src/PageInfo';
@Component({
  selector: 'products-side-panel',
  templateUrl: './products.side-panel.component.html',
  styleUrls: ['./products.side-panel.component.css'],
  
})
export class ProductsSidePanelComponent implements OnInit {

  @Input()
  public products: Observable<ProductModel[]>;
  public pageInfo: Observable<PageInfo>;
    
  constructor(public store: Store<fromReducer.FeatureState>) { }

  ngOnInit() {
    this.pageInfo = this.store.select(fromSelectors.getProductsPageInfo);
  }

  onPageClicked(pageInfo: PageInfo){
    this.store.dispatch(new ProductsActions.SetPageInfo(pageInfo));
    this.store.dispatch(new ProductsActions.FetchProducts(pageInfo));
  }

  addProductToPurchase(product: ProductModel){
    this.store.dispatch(new ProductsActions.DecrementCount(product.id));
    const purchaseUnit = new PurchaseUnitModel('', product, 1, product.storePrice);
    this.store.dispatch(new Actions.AddPurchaseUnit(purchaseUnit));
  }  
}

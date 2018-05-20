import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Store } from '@ngrx/store';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';

import * as ProductsActions from '../../products/store/products.actions';
import * as Actions from '../store/purchases.actions';
import * as fromPurchases from '../store/reducers/purchases.reducers';
import * as fromSelectors from '../store/reducers/purchases.selectors';
import { PurchaseModel } from '../src/PurchaseModel';
import { ContactModel } from '../src/ContactModel';
import * as fromProducts from '../../products/store/reducers/products.reducers';
import { ProductModel } from '../../products/src/ProductModel';
import { PurchaseUnitModel } from '../../src/PurchaseUnit';
import * as fromReducers from '../store/reducers';
import { PurchaseDeliveryModel } from '../src/PurchaseDeliveryModel';
import { ProductsSidePanelComponent } from '../products.side-panel/products.side-panel.component';
import { SidePanelContainerComponent } from '../../shared/side-panel-container/side-panel-container.component';
import { PurchaseDeliveryComponent } from '../purchase-delivery/purchase-delivery.component';
import { PurchaseUnitStatus } from '../../src/PurchaseUnitStatus';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurchaseComponent implements OnInit, AfterViewInit {
  public products: Observable<ProductModel[]>;
  public purchaseForm: FormGroup;

  public editPurchase: Observable<PurchaseModel>;
  public purchaseUnits: Observable<PurchaseUnitModel[]>;
  public purchaseDeliveries: Observable<PurchaseDeliveryModel[]>;
  public needDelivery: boolean = false;
  
  public purchaseDate = new Date();

  public myDatePickerOptions: IMyOptions = {
      dateFormat: 'dd.mm.yyyy',
      height: '34px',
      width: '210px',
      inline: false
  };

  private editedPurchaseId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducers.FeatureState>,
    private resolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.editPurchase = this.store.select(fromSelectors.getEditedPurchase);
    this.purchaseDeliveries = this.store.select(fromSelectors.getEditedPurchaseDeliveries);
    this.purchaseUnits = this.store.select(fromSelectors.getPurchaseUnits);
    this.products = this.store.select(fromSelectors.getAllProducts);
    
    this.store.dispatch(new ProductsActions.FetchProducts());
    this.store.dispatch(new Actions.GetDeliveries());

    this.IsEdit()
    .subscribe((result: {isEdit: boolean, id: string}) => {
      if(result.isEdit){
        this.editedPurchaseId = result.id;
        this.editPurchase.skip(1)
        .take(1)
        .subscribe(p => {          
          this.initForm(p);
          this.needDelivery = p.deliveries.length > 0;
          this.purchaseUnits = this.store.select(fromSelectors.getEditedPurchaseUnits);
          this.cd.detectChanges();
        })
      }
      else{        
        this.initForm();
      }
    });    
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  public IsEdit(){
    return this.route.params.switchMap((params: Params) => {            
        let result = { isEdit: false, id: '' };
        if (params['id'] !== undefined) {
          result.id = params['id'];
          result.isEdit = true;
          
          this.store.dispatch(new Actions.GetPurchase(result.id));
        }
        else{
            result.isEdit = false;
        }

        return Observable.of(result);
      });
}

  initForm(editedPurchase: PurchaseModel = null){
    let purchase: PurchaseModel;

    if (editedPurchase) {
      purchase = editedPurchase;
    }
    else{
      let delivery = new PurchaseDeliveryModel([], new Date(), '', 0, 0, {id: '', name: ''}, []);
      purchase = new PurchaseModel('',  new Date(), [], [delivery]);
    }

    this.purchaseForm = new FormGroup({
      'date': new FormControl(purchase.date, Validators.required),
      'deliveries': new FormArray([])
    });
  }

  public getDeliveriesFromPurchaseForm(){
    return <FormArray>this.purchaseForm.get('deliveries');
  }

  onDateChanged(dateModel: IMyDateModel){
    let date = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
    this.purchaseForm.get('date').setValue(date);
  }

  clearPurchaseProducts(){
    this.store.dispatch(new Actions.ClearPurchaseUnits({}));
    this.store.dispatch(new ProductsActions.FetchProducts());
  }

  @ViewChild(SidePanelContainerComponent)
  public sidePanelComponent: SidePanelContainerComponent;
  sidePanelOpenProducts(){
    this.sidePanelComponent.container.clear();

    this.sidePanelComponent.headTitle = 'Товары к покупке';
    const factory = this.resolver.resolveComponentFactory(ProductsSidePanelComponent);    
    let compRef = this.sidePanelComponent.container.createComponent(factory);    
    compRef.instance.products = this.products;

    this.sidePanelComponent.show = true;
  }

  sidePanelOpenDeliveries(){
    this.needDelivery = !this.needDelivery;

    if (!this.needDelivery) {
      this.cd.detectChanges();
      return;
    }

    this.sidePanelComponent.container.clear();

    this.sidePanelComponent.headTitle = 'Доставки';
    const factory = this.resolver.resolveComponentFactory(PurchaseDeliveryComponent);    
    let compRef = this.sidePanelComponent.container.createComponent(factory);    
    compRef.instance.deliveries = this.purchaseDeliveries;
    compRef.instance.formGroup = this.purchaseForm;

    this.sidePanelComponent.show = true;
  }

  deleteProductFromPurchase(productId: string){
    this.store.dispatch(new ProductsActions.IncrementCount(productId));
    this.store.dispatch(new Actions.DeletePurchaseUnit(productId));
  }

  checkPurchaseValid(){
    return this.purchaseForm.valid;
  }

  addPurchase(){
    let purchase = <PurchaseModel>this.purchaseForm.value;
    this.purchaseUnits.take(1)
    .subscribe(pList => {
      purchase.purchaseUnits = pList;
    });

    let deliveries = [];
    if(purchase.deliveries.length > 0){
      purchase.deliveries.forEach(del => {
        deliveries.push(new PurchaseDeliveryModel(del.contacts, del.date, del.address, del.timeFrom, del.timeTo, del.driver, del.purchaseUnits));
      });
    }
    else{
      this.purchaseDeliveries.take(1).subscribe(dels => 
        dels.forEach(del =>
          deliveries.push(new PurchaseDeliveryModel(del.contacts, del.date, del.address, del.timeFrom, del.timeTo, del.driver, del.purchaseUnits))
        )
      );
    }

    purchase.deliveries = deliveries;
    if (this.editedPurchaseId) {
      purchase.id = this.editedPurchaseId;
      this.store.dispatch(new Actions.EditPurchase({purchase: purchase, id: this.editedPurchaseId}));
    }
    else{
      this.store.dispatch(new Actions.AddPurchase(purchase));
    }
  }
}

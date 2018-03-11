import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromImports from '../store/reducers/imports.reducers';
import * as fromReducers from '../store/reducers';
import * as fromSelectors from '../store/reducers/imports.selectors';
import * as ImportActions from '../store/imports.actions';
import * as fromProducts from '../../products/store/reducers/products.reducers';
import { ImportModel } from '../src/ImportModel';
import { ImportStatus } from '../src/ImportStatus'
import { INameId } from '../../src/INameId';
import { ProductModel } from '../../products/src/ProductModel';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { PageInfo } from '../../src/PageInfo';
import { ProviderModel } from '../../providers/src/ProviderModel';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  public importsState: Observable<ImportModel[]>;
  public providers: Observable<ProviderModel[]>;
  public pageInfo: Observable<PageInfo>;
  public productsState: Observable<ProductModel[]>;
  public importForm: FormGroup;
  
  public importProducts: ProductModel[] = new Array<ProductModel>();
  
  public importDate = new Date();

  public myDatePickerOptions: IMyOptions = {
      dateFormat: 'dd.mm.yyyy',
      height: '34px',
      width: '210px',
      inline: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducers.FeatureState>
  ) { }

  ngOnInit() {
    this.importsState = this.store.select(fromSelectors.getAllImports);
    this.providers = this.store.select(fromSelectors.getAllProviders);
    this.productsState = this.store.select(fromSelectors.getAllProducts);
    //this.store.dispatch(new ImportActions.FetchDeliveries())
    this.initForm();
  }

  initForm(){
    let address = '';
    let provider = new FormGroup({
      'Id': new FormControl('', Validators.required),
      'Name': new FormControl('', Validators.required)
    });

    let count = 0;

    this.importForm = new FormGroup({
      'provider': provider,
      'importDate': new FormControl(this.importDate, Validators.required),
      'createdDate': new FormControl(this.importDate, Validators.required),
      'finishDate': new FormControl(this.importDate),
    });    
  }

  onProviderSelect(selectedProvider: INameId){
    let provider = <FormGroup>this.importForm.get('Provider');
      provider.setControl('Id', new FormControl(selectedProvider.id, Validators.required));
      provider.setControl('Name', new FormControl(selectedProvider.name, Validators.required));
  }

  onCreatedDateChanged(dateModel: IMyDateModel){
    this.setControlDate('createdDate', dateModel);
  }

  onImportDateChanged(dateModel: IMyDateModel){
    this.setControlDate('importDate', dateModel);
  }

  onFinishDateChanged(dateModel: IMyDateModel){
    this.setControlDate('finishDate', dateModel);
  }

  setControlDate(controlName:string, dateModel: IMyDateModel){
    let date = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
    this.importForm.setControl(controlName, new FormControl(date, Validators.required));
  }

  addProductToImport(product: ProductModel){
    this.importProducts.push(product);
  }

  deleteProductFromImport(index: number){
    this.importProducts.splice(index, 1);
  }

  clearImportProducts(){
    this.importProducts = [];
  }

  addImport(){
    
  }
}

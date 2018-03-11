import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as Actions from '../store/imports.actions';
import * as fromImports from '../store/reducers/imports.reducers';
import * as fromReducers from '../store/reducers';
import * as fromSelectors from '../store/reducers/imports.selectors';
import * as fromProviders from '../../providers/store/reducers/providers.reducers';
import { ImportModel } from '../src/ImportModel';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { INameId } from '../../src/INameId';
import { ProviderModel } from '../../providers/src/ProviderModel';
import { PageInfo } from '../../src/PageInfo';

@Component({
  selector: 'app-imports-list',
  templateUrl: './imports-list.component.html',
  styleUrls: ['./imports-list.component.css']
})
export class ImportsListComponent implements OnInit {
  public imports: Observable<ImportModel[]>;
  public pageInfo: Observable<PageInfo>;
  public providers: Observable<ProviderModel[]>
  public editedImport: ImportModel;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  public datePickerOptions: IMyOptions = {
    dateFormat: 'dd.mm.yyyy',
    height: '34px',
    width: '210px',
    inline: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducers.FeatureState>,
  ) { }

  ngOnInit() {
    this.imports = this.store.select(fromSelectors.getAllImports);
    this.providers = this.store.select(fromSelectors.getAllProviders);
    this.pageInfo = this.store.select(fromSelectors.getPageInfo);
  }

  editImport(importModel: ImportModel){
    this.editedImport = new ImportModel(
      importModel.id,
      importModel.provider,
      importModel.products,
      importModel.createdDate,
      importModel.importDate,
      importModel.finishDate);

    this.editedImport.status = importModel.status;
  }

  deleteImport(id: string){
    this.store.dispatch(new Actions.DeleteImport(id));
  }

  saveImport(id: string){
    this.store.dispatch(new Actions.EditImport({ id: id, import: this.editedImport }));
    this.editedImport = null;
  }

  onCreatedDateChanged(dateModel: IMyDateModel){
    let date = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
    this.editedImport.createdDate = date;
  }

  onImportDateChanged(dateModel: IMyDateModel){
    let date = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
    this.editedImport.importDate = date;
  }

  onFinishDateChanged(dateModel: IMyDateModel){
    let date = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
    this.editedImport.finishDate = date;
  }

  onProviderSelect(selectedProvider: INameId){
    this.editedImport.provider = selectedProvider;
  }

  cancel(){
    this.editedImport = null;
  }

  loadTemplate(importModel: ImportModel){
    if (this.editedImport && this.editedImport.id == importModel.id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }
}

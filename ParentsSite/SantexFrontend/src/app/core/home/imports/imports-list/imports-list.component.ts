import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as Actions from '../store/imports.actions';
import * as fromImports from '../store/imports.reducers';
import * as fromProviders from '../../providers/store/providers.reducers';
import { ImportModel } from '../src/ImportModel';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { INameId } from '../../src/INameId';

@Component({
  selector: 'app-imports-list',
  templateUrl: './imports-list.component.html',
  styleUrls: ['./imports-list.component.css']
})
export class ImportsListComponent implements OnInit {
  importsState: Observable<fromImports.State>;
  editedImport: ImportModel;

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
    private store: Store<fromImports.FeatureState>,
    private providersStore: Store<fromProviders.FeatureState>,
  ) { }

  ngOnInit() {
    this.importsState = this.store.select('imports');
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

  deleteImport(index: number){
    this.store.dispatch(new Actions.DeleteImport(index));
  }

  saveImport(index: number){
    this.store.dispatch(new Actions.EditImport({ index: index, import: this.editedImport }));
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

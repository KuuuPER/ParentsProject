import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as Actions from '../store/manufactures.actions';
import * as fromManufactures from '../store/manufactures.reducers';
import { ManufactureModel } from '../src/ManufactureModel';

@Component({
  selector: 'app-manufacture-list',
  templateUrl: './manufacture-list.component.html',
  styleUrls: ['./manufacture-list.component.css']
})
export class ManufactureListComponent implements OnInit {
  manufacturesState: Observable<fromManufactures.State>;
  editedManufacture: ManufactureModel;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromManufactures.FeatureState>
  ) { }

  ngOnInit() {
    this.manufacturesState = this.store.select('manufactures');
  }

  editManufacture(manufacture: ManufactureModel){
    this.editedManufacture = new ManufactureModel(manufacture.Name, manufacture.Id);
  }

  deleteManufacture(index: number){
    this.store.dispatch(new Actions.DeleteManufacture(index));
  }

  saveManufacture(index: number){
    this.store.dispatch(new Actions.EditManufacture({ index: index, manufacture: this.editedManufacture }));
    this.editedManufacture = null;
  }

  cancel(){
    this.editedManufacture = null;
  }

  loadTemplate(manufacture: ManufactureModel){
    if (this.editedManufacture && this.editedManufacture.Id == manufacture.Id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }
}

import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as Actions from '../store/manufactures.actions';
import * as fromReducers from '../store/reducers';

import * as fromSelectors from '../store/reducers/manufactures.selectors';
import { ManufactureModel } from '../src/ManufactureModel';
import { PageInfo } from '../../src/PageInfo';

@Component({
  selector: 'app-manufacture-list',
  templateUrl: './manufacture-list.component.html',
  styleUrls: ['./manufacture-list.component.css']
})
export class ManufactureListComponent implements OnInit {
  manufactures: Observable<ManufactureModel[]>;
  pageInfo: Observable<PageInfo>;
  editedManufacture: ManufactureModel;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducers.FeatureState>
  ) { }

  ngOnInit() {
    this.manufactures = this.store.select(fromSelectors.getAllManufactures);
    this.pageInfo = this.store.select(fromSelectors.getPageInfo);

    this.pageInfo
    .take(1)
    .subscribe((p) => {
      this.store.dispatch(new Actions.FetchManufactures(p));
    });
  }

  editManufacture(manufacture: ManufactureModel){
    this.editedManufacture = new ManufactureModel(manufacture.id, manufacture.name, manufacture.country);
  }

  deleteManufacture(id: string){
    this.store.dispatch(new Actions.DeleteManufacture(id));
  }

  saveManufacture(id: string){
    this.store.dispatch(new Actions.EditManufacture({ id: id, manufacture: this.editedManufacture }));
    this.editedManufacture = null;
  }

  cancel(){
    this.editedManufacture = null;
  }

  onPageClicked(pageInfo: PageInfo){
    this.store.dispatch(new Actions.ChangePage(pageInfo.currentPage));
    this.store.dispatch(new Actions.FetchManufactures(pageInfo));
  }

  getItemNumber(info: PageInfo, index: number): number{
    return info.itemsPerPage * (info.currentPage - 1) + index + 1;
  }

  loadTemplate(manufacture: ManufactureModel){
    if (this.editedManufacture && this.editedManufacture.id == manufacture.id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }
}

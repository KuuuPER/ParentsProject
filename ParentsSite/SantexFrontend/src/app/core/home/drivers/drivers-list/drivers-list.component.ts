import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as Actions from '../store/drivers.actions';
import * as fromDrivers from '../store/reducers/drivers.reducers';
import * as fromSelectors from '../store/reducers/drivers.selectors';
import * as fromReducers from '../store/reducers';
import * as fromIndex from '../store/reducers/index';
import { DriverModel } from '../src/DriverModel';
import { PageInfo } from '../../src/PageInfo';
import { DriversListService } from '../services/drivers-list.service';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css']
})
export class DriversListComponent implements OnInit {
  drivers: Observable<DriverModel[]>;
  pageInfo: Observable<PageInfo>;
  editedDriver: DriverModel;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;


  constructor(
    private service: DriversListService,
    private router: Router,
    private store: Store<fromReducers.FeatureState>
  ) { }

  ngOnInit() {
    this.drivers = this.store.select(fromSelectors.getAllDrivers);
    this.pageInfo = this.store.select(fromSelectors.getPageInfo);

    this.service.fetchFirstPage(this.pageInfo);
  }

  editDriver(driver: DriverModel){
    this.editedDriver = new DriverModel(driver.id, driver.name, driver.rate, driver.notes, driver.deliveries);
  }

  deleteDriver(id: string){
    this.store.dispatch(new Actions.DeleteDriver(id));
  }

  saveDriver(id: string){
    this.store.dispatch(new Actions.EditDriver({ id: id, driver: this.editedDriver }));
    this.editedDriver = null;
  }

  cancel(){
    this.editedDriver = null;
  }

  getItemNumber(info: PageInfo, index: number): number{
    return info.itemsPerPage * (info.currentPage - 1) + index + 1;
  }

  onPageClicked(pageInfo: PageInfo){
    this.store.dispatch(new Actions.FetchDrivers(pageInfo));
    this.store.dispatch(new Actions.ChangePage(pageInfo.currentPage));
  }

  loadTemplate(driver: DriverModel){
    if (this.editedDriver && this.editedDriver.id == driver.id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }
}

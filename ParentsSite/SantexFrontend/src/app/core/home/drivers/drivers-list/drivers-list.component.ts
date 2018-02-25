import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as Actions from '../store/drivers.actions';
import * as fromDrivers from '../store/drivers.reducers';
import { DriverModel } from '../src/DriverModel';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css']
})
export class DriversListComponent implements OnInit {
  driversState: Observable<fromDrivers.State>;
  editedDriver: DriverModel;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromDrivers.FeatureState>
  ) { }

  ngOnInit() {
    this.driversState = this.store.select('drivers');
  }

  editDriver(driver: DriverModel){
    this.editedDriver = new DriverModel(driver.id, driver.name, driver.rate, driver.notes, driver.deliveries);
  }

  deleteDriver(index: number){
    this.store.dispatch(new Actions.DeleteDriver(index));
  }

  saveDriver(index: number){
    this.store.dispatch(new Actions.EditDriver({ index: index, driver: this.editedDriver }));
    this.editedDriver = null;
  }

  cancel(){
    this.editedDriver = null;
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

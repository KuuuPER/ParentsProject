import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromReducers from '../store/reducers';
import * as fromSelectors from '../store/reducers/drivers.selectors';
import * as Actions from '../store/drivers.actions';
import { DriverModel } from '../src/DriverModel';
import { DriverService } from '../services/driver.service';
import { DriverDeliveryModel } from '../src/DriverDeliveryModel';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers: [DriverService]
})
export class DriverComponent implements OnInit {
  public driverForm: FormGroup;
  
  public drivers: Observable<DriverModel[]>;
  public editedDriver: Observable<DriverModel>;
  public driverDeliveries: Observable<DriverDeliveryModel[]>;
  public id: string;

  constructor(
    private service: DriverService,
    private store: Store<fromReducers.FeatureState>) { }

  ngOnInit() {
    this.drivers = this.store.select(fromSelectors.getAllDrivers);
    this.editedDriver = this.store.select(fromSelectors.getEditedDriver);
    this.driverDeliveries = this.store.select(fromSelectors.getEditedDriverDeliveries);

    
    this.service.IsEdit()
    .take(1)
    .subscribe((res: { isEdit: boolean, id: string }) => {
      if (res.isEdit) {
        this.editedDriver.skip(1)
        .take(1)
        .subscribe(d => {
            this.initForm(<DriverModel>d);
          });

          this.id = res.id;
        }
        else{
          this.initForm();
        }
      });
  }

  initForm(editedDriver?: DriverModel){
    let driver: DriverModel;

    if (editedDriver) {
      driver = new DriverModel(editedDriver.id, editedDriver.name, editedDriver.rate, editedDriver.notes, editedDriver.deliveries);
    }
    else{
      driver = new DriverModel('', '', 0, '', null);
    }

    this.driverForm = new FormGroup({
      'name': new FormControl(driver.name, Validators.required),
      'rate': new FormControl(driver.rate, Validators.required),
      'notes': new FormControl(driver.notes),
    });
  }

  addDriver(){
    let driver = <DriverModel>this.driverForm.value;
    if (this.editedDriver) {
      driver.id = this.id;
      this.store.dispatch(new Actions.EditDriver({driver: driver, id: this.id}));
    }
    else{
      this.store.dispatch(new Actions.AddDriver(driver));
    }
    this.onCancel();
  }
  
  onCancel(){
    this.service.moveToList();
  }
}

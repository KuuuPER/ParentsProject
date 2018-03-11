import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromReducers from '../store/reducers';
import * as fromSelectors from '../store/reducers/drivers.selectors';
import * as Actions from '../store/drivers.actions';
import { DriverModel } from '../src/DriverModel';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  driverForm: FormGroup;
  
  public driversState: Observable<DriverModel[]>;
  

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducers.FeatureState>) { }

  ngOnInit() {
    this.driversState = this.store.select(fromSelectors.getAllDrivers);

    this.initForm();
  }

  initForm(){
    this.driverForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'rate': new FormControl(0, Validators.required),
      'notes': new FormControl(''),
    });
  }

  addDriver(){
    let newDriver = <DriverModel>this.driverForm.value;
    this.store.dispatch(new Actions.AddDriver(newDriver))
    this.onCancel();
  }
  
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}

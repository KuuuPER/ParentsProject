import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromManufacture from '../store/manufacture.reducers';
import * as Actions from '../store/manufacture.actions';
import { ManufactureModel } from '../src/ManufactureModel';

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.css']
})
export class ManufactureComponent implements OnInit {
  manufactureForm: FormGroup;
  
  manufacturesState: Observable<fromManufacture.State>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromManufacture.FeatureState>) { }

  ngOnInit() {
    this.manufacturesState = this.store.select('manufactures');

    this.initForm();
  }

  initForm(){
    let manufactureName = '';

    this.manufactureForm = new FormGroup({
      'Name': new FormControl(manufactureName, Validators.required)
    });
  }

  addManufacture(){
    let newManufacture = <ManufactureModel>this.manufactureForm.value;
    this.store.dispatch(new Actions.AddManufacture(newManufacture))
    this.onCancel();
  }
  
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}

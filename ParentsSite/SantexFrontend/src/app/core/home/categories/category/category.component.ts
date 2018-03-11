import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromCategory from '../store/reducers/categories.reducers';
import * as Actions from '../store/categories.actions';
import * as fromSelectors from '../store/reducers/categories.selectors';
import { CategoryModel } from '../src/CategoryModel';
import { PageInfo } from '../../src/PageInfo';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  
  categoriesState: Observable<CategoryModel[]>;
  pageInfo: Observable<PageInfo>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromCategory.FeatureState>) { }

  ngOnInit() {
    this.categoriesState = this.store.select(fromSelectors.getAllCategories);

    this.initForm();
  }

  initForm(){
    let categoryName = '';

    this.categoryForm = new FormGroup({
      'Name': new FormControl(categoryName, Validators.required)
    });
  }

  addCategory(){
    let newCategory = <CategoryModel>this.categoryForm.value;
    this.store.dispatch(new Actions.AddCategory(newCategory))
    this.onCancel();
  }
  
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}

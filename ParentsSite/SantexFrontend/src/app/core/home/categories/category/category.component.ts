import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromReducers from '../store/reducers';
import * as Actions from '../store/categories.actions';
import * as fromCategories from '../store/reducers/categories.reducers';
import * as fromSelectors from '../store/reducers/categories.selectors';
import { CategoryModel } from '../src/CategoryModel';
import { PageInfo } from '../../src/PageInfo';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  public categoryForm: FormGroup;
  
  public categories: Observable<CategoryModel[]>;
  public pageInfo: Observable<PageInfo>;

  public id: string;
  public editedCategory: Observable<CategoryModel>;

  constructor(private service: CategoryService,
    private store: Store<fromReducers.FeatureState>) { }

  ngOnInit() {
    this.categories = this.store.select(fromSelectors.getAllCategories);
    this.editedCategory = this.store.select(fromSelectors.getEditCategory);

    this.service.IsEdit()
      .subscribe((res: { isEdit: boolean, id: string }) => {        
        if (res.isEdit) {
          this.editedCategory.skip(1)
          .take(1)
          .subscribe(c => {
            this.initForm(<CategoryModel>c);
          });

          this.id = res.id;
        }
        else{
          this.initForm();
        }
      });
  }

  initForm(category: CategoryModel = null){
    if(category == null){
      category = new CategoryModel('', '');
    }
    
    this.categoryForm = new FormGroup({
      'name': new FormControl(category.name, Validators.required)
    });
  }

  addCategory(){
    let newCategory = <CategoryModel>this.categoryForm.value;

    this.service.AddCategory(newCategory);
  }
  
  onCancel(){
    this.service.Cancel();
  }
}

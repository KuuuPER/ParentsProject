import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromReducer from '../store/reducers';
import * as Actions from '../store/categories.actions';
import * as fromCategories from '../store/reducers/categories.reducers';
import * as fromSelectors from '../store/reducers/categories.selectors';
import * as fromIndex from '../store/reducers/index';
import { CategoryModel } from '../src/CategoryModel';
import { PageInfo } from '../../src/PageInfo';
import { CategoriesListService } from '../services/category-list.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
  providers: [CategoriesListService]
})
export class CategoriesListComponent implements OnInit {
  public categories: Observable<CategoryModel[]>;
  public pageInfo: Observable<PageInfo>;
  public editedCategory: CategoryModel;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;


  constructor(
    private service: CategoriesListService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducer.FeatureState>
  ) { }

  ngOnInit() {
    this.categories = this.store.select(fromSelectors.getAllCategories);
    this.pageInfo = this.store.select(fromSelectors.getPageInfo);

    this.service.fetchFirstPage(this.pageInfo);
  }

  editCategory(category: CategoryModel){
    this.editedCategory = new CategoryModel(category.name, category.id);
  }

  deleteCategory(id: string){
    this.store.dispatch(new Actions.DeleteCategory(id));
  }

  saveCategory(id: string){
    this.store.dispatch(new Actions.EditCategory({
      id: id,
      category: this.editedCategory
    }));
    
    this.editedCategory = null;
  }

  onPageClicked(pageInfo: PageInfo){
    this.store.dispatch(new Actions.ChangePage(pageInfo.currentPage));
    this.store.dispatch(new Actions.FetchCategories(pageInfo));
  }

  getItemNumber(info: PageInfo, index: number): number{
    return info.itemsPerPage * (info.currentPage - 1) + index + 1;
  }
  
  cancel(){
    this.editedCategory = null;
  }

  loadTemplate(category: CategoryModel){
    if (this.editedCategory && this.editedCategory.id == category.id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }
}

import { Component, OnInit, Input, ViewChild, TemplateRef, EventEmitter, Output } from '@angular/core';
import { PageInfo } from '../../src/PageInfo';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  @ViewChild('fewItems') fewItemsTemplate: TemplateRef<any>;
  @ViewChild('aLotItems') aLotItemsTemplate: TemplateRef<any>;

  @Input()
  public pageInfo: PageInfo;  

  public Arr = Array;

  constructor() { }

  ngOnInit() {
  }

  @Output() onPageClick = new EventEmitter<PageInfo>();
  pageClick(pageNum: number){
    this.pageInfo.currentPage = pageNum;
    this.onPageClick.emit(this.pageInfo);
  }

  loadTemplate(){
    if(this.pageInfo.pageCount() <= 5){
      return this.fewItemsTemplate;
    }
    else{
      return this.aLotItemsTemplate;
    }
  }
}

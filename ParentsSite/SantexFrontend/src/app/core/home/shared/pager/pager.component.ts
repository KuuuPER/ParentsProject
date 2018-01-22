import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  @ViewChild('fewItems') fewItemsTemplate: TemplateRef<any>;
  @ViewChild('aLotItems') aLotItemsTemplate: TemplateRef<any>;

  @Input()
  pagesCount: number;
  @Input()
  currentPage: number;

  Arr = Array;

  

  constructor() { }

  ngOnInit() {
  }

  loadTemplate(){
    if(this.pagesCount <= 5){
      return this.fewItemsTemplate;
    }
    else{
      return this.aLotItemsTemplate;
    }
  }
}

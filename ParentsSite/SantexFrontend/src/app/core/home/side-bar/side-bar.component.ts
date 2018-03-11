import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  public hidden: boolean = false;

  @Output() onSidebarToggle = new EventEmitter<boolean>();

  sidebarToggle(){
    this.hidden = !this.hidden;
    this.onSidebarToggle.emit(this.hidden);
  }

  constructor() { }

  ngOnInit() {
  }

}

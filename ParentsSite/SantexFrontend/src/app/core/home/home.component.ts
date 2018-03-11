import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  list: {Type: string, Value: string};

  public sidebarHidden: boolean = false;
  onSidebarToggle(flag: boolean){
    this.sidebarHidden = flag;
  }

  constructor(private client: HttpClient) {
    
   }

  ngOnInit() {
  }
}
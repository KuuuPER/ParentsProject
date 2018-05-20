import { Component, OnInit, Input, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'side-panel-container',
  templateUrl: './side-panel-container.component.html',
  styleUrls: ['./side-panel-container.component.css'],
  animations: [
    trigger('showIn', [
        state('false', style({transform: 'translateX(100%)'})),
        state('true', style({transform: 'translateX(0%)'})),
        transition('false => true', [
          animate(100)
        ]),
        transition('true => false', [
          animate(200)
        ]),
      ],
    ),
    trigger('blackout', [
      state('false', style({        
        opacity: '0'
      })),
      state('true', style({
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        opacity: '0.6'
      })),
      transition('false => true', [
        animate(200)
      ]),
      transition('true => false', [
        animate(100)
      ]),
    ],
  ),
  ]
})
export class SidePanelContainerComponent implements OnInit {
  @Input()
  public show: boolean = false;

  @Input()
  public headTitle: string;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  @ViewChild('componentContainer', {read: ViewContainerRef}) container: ViewContainerRef;

  onClose(){
    this.show = false;
    this.cd.markForCheck();
  }
}

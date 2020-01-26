import { Component, OnInit } from '@angular/core';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-config1',
  templateUrl: './config1.component.html',
  styleUrls: ['./config1.component.css'],
  providers: [NgbPopoverConfig]
})
export class Config1Component implements OnInit {

  constructor(config: NgbPopoverConfig) {
    // customize default values of popovers used by this component tree
    config.placement = 'top-left';
    config.triggers = 'hover';
  }

  ngOnInit() {
  }

}



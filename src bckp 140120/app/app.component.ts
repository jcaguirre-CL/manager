import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'manager';
  navLinks: any[];
  activeLinkIndex = -1; 

  panelOpenState = false;

  constructor(private router: Router) {
    this.navLinks = [
        {
            label: 'INICIO',
            link: 'inicio',
            index: 0
        }, {
            label: 'REGISTRO',
            link: 'form1',
            index: 1
        }, {
            label: 'HISTORIAL',
            link: 'historial1',
            index: 2
        }, {
          label: 'CONFIGURACION',
          link: 'config1',
          index: 3
      } 
    ];
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
import { Router } from '@angular/router';

import { AuthenticationService } from './login-containers/_services';
import { User } from './login-containers/_models';

import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';

import './login-containers/_content/app.less';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  currentUser: User;
  title = 'manager';
  navLinks: any[];
  activeLinkIndex = -1; 

  panelOpenState = true;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.navLinks = [
        {
            label: 'INICIO',
            link: 'inicio',
            index: 1
        }, {
            label: 'REGISTRO VIVO/GX',
            link: 'form1',
            index: 2
        }, {
            label: 'HISTORIAL',
            link: 'historial1',
            index: 3
        }, {
          label: 'CONFIGURACION',
          link: 'config1',
          index: 4
      } 
    ];
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = 'True';
}
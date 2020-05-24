import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login-containers/_services';
import { UserService } from '../login-containers/_services';
import { User } from '../login-containers/_models';
import { OperacionesForm1ServicioService } from '../servicios/operaciones-form1-servicio.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [
    OperacionesForm1ServicioService,
    AuthenticationService
  ]
})
export class InicioComponent implements OnInit {
  public mycurrentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.mycurrentUser = x);
      }
  ngOnInit() {
    this.userService.getOne(this.mycurrentUser.usuario, this.mycurrentUser['token'])
    .pipe(first())
    .subscribe(
        data => {
        });
  }

}

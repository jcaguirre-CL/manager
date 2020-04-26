import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt hash if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.hash) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.hash}`
                }
            });
        }

        return next.handle(request);
    }
}
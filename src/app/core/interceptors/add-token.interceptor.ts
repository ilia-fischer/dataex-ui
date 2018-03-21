import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

    constructor(public auth: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!this.auth.isAuthenticationRoute(request.url)){
            request = request.clone({
                setHeaders: {
                    'x-access-token': this.auth.getToken()
                }
            });
        }
        return next.handle(request);
    }
}
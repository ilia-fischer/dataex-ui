import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs/Observable';
import { PageService } from '../page.service';
import 'rxjs/add/operator/do';

// export class UnauthorizedRedirectInterceptor implements HttpInterceptor {

//     constructor(public auth: AuthenticationService, private pageService: PageService) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//         return next.handle(request).do((event: HttpEvent<any>) =>
//         // Regular response. Do Nothing
//         {
//             if (event instanceof HttpResponse) {
//                 // do stuff with response if you want
//             }
//         },
//         // Error response. Redirect on 401
//         (err: any) => {
//             if (err instanceof HttpErrorResponse) {
//                 if (err.status === 401) {
//                     this.pageService.goToLoginPage();
//                 }
//             }
//         });
//     }
// }
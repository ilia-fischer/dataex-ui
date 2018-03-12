import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { PageService } from '../page.service';


@Injectable()
export class LoginAuthGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private pageService: PageService){}

    canActivate() {
        if(this.authService.isAuthenticated()){
            return true;
        }
        if(!this.pageService.isLoginPage()){
            console.error("User is not logged in. Redirecting to Login Page");
            this.pageService.goToLoginPage();
        }
        return false;
    }
}
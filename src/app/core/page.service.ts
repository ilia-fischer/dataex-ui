import { Injectable } from '@angular/core';
import { User } from './../shared/user.model';
import { UserService } from './user.service';
import { Router } from '@angular/router';


@Injectable()
export class PageService {
    public static readonly LOGIN_ROUTE = "login";
    public static readonly HOME_DESCRIPTION_ROUTE = "";
    public static readonly DATASETS_ROUTE = "datasets";
    public static readonly ADMIN_ROUTE = "admin";
    public static readonly ACCOUNT_ROUTE = "account";

    private readonly rolesToRoutes = {};

    constructor(private userService: UserService, private router: Router) {
        //Set up mapping for role -> default route when using logs in or goes home.
        this.rolesToRoutes[UserService.CONSUMER_ROLE] = { "priority": 1, "route": PageService.DATASETS_ROUTE };
        this.rolesToRoutes[UserService.ADMIN_ROLE] = { "priority": 2, "route": PageService.ADMIN_ROUTE };
        this.rolesToRoutes[UserService.PROVIDER_ROLE] = { "priority": 3, "route": PageService.ACCOUNT_ROUTE };
    }

    public goToDefaultPage(){
        if(!this.userService.isSignedIn()){
            return this.goToLoginPage();
        }

        let user: User = this.userService.getUser();
        let sorted = user.roles.sort( (a,b) => {
            return this.rolesToRoutes[a].priority - this.rolesToRoutes[b].priority;
        });

        let route = `/${this.rolesToRoutes[sorted[0]].route}`;
        console.info(`Navigating to default page ${route}`);
        this.router.navigate([route]);
    }

    public goToLoginPage(){
        console.debug(`Navigating to login page.`);
        this.router.navigate([`/${PageService.LOGIN_ROUTE}`]);
    }

    public goToAdminPage(){
        console.debug(`Navigating to admin page.`);
        this.router.navigate([`/${PageService.ADMIN_ROUTE}`]);
    }

    public goToAccountPage(){
        console.debug(`Navigating to account page.`);
        this.router.navigate([`/${PageService.ACCOUNT_ROUTE}`]);
    }

    public goToDatasetPage(){
        console.debug(`Navigating to dataset page.`);
        this.router.navigate([`/${PageService.DATASETS_ROUTE}`]);
    }

    public isLoginPage(){
        return this.router.url.includes(PageService.LOGIN_ROUTE);
    }

}

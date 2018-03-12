import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { User } from './../shared/user.model';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class UserService {
    private static readonly USER_KEY = 'user';
    public static readonly CONSUMER_ROLE: string = "consumer";
    public static readonly PROVIDER_ROLE: string = "provider";
    public static readonly ADMIN_ROLE: string = "administrator";

    //Do not use user directly in this class ... use getUser()
    user: User = null;
    userSubject = new Subject<User>();

    constructor(private authService: AuthenticationService) { }

    getUser(): User{
        if(this.user == null){
            let val = localStorage.getItem(UserService.USER_KEY);
            if(val == null || val == 'null'){
                this.user = null;
            }
            else {
                this.user = JSON.parse(val);
                this.userSubject.next(this.user);
            }
        }
        return this.user;
    }

    getUserObservable(): Observable<User>{
        return this.userSubject.asObservable();
    }

    setUser(user: User){
        this.user = user;
        localStorage.setItem(UserService.USER_KEY, JSON.stringify(user));
        this.userSubject.next(this.user);
    }

    isSignedIn(): Boolean{
        return this.authService.isAuthenticated() && this.getUser() != null;
    }

    isConsumer(): Boolean{
        return this.isSignedIn() && this.getUser().roles.includes(UserService.CONSUMER_ROLE);
    }

    isProvider(): Boolean{
        return this.isSignedIn() && this.getUser().roles.includes(UserService.PROVIDER_ROLE);
    }

    isAdmin(): Boolean{
        return this.isSignedIn() && this.getUser().roles.includes(UserService.ADMIN_ROLE);
    }

    signIn(user, pass): Promise<User>{

        return this.authService.authenticate(user, pass)
            .then((user: User) => {
                this.setUser(user);
                return user;
            });
    }

    signOut(){
        this.setUser(null);
        this.authService.setToken(null);
    }

}

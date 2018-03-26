import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

import { User } from './../shared/user.model';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class UserService {
    private static readonly USER_KEY = 'user';
    private static readonly CURRENT_USER_URI = '/api/auth/me';
    public static readonly CONSUMER_ROLE: string = "Consumer";
    public static readonly PROVIDER_ROLE: string = "Provider";
    public static readonly ADMIN_ROLE: string = "Administrator";

    //Do not use user directly in this class ... use getUser()
    user: User = null;
    userSubject = new Subject<User>();

    constructor(private authService: AuthenticationService, private http: HttpClient, private settingsService: SettingsService) { }

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
            .then(() => {
                return this.http.get(`${this.settingsService.apiUrl()}${UserService.CURRENT_USER_URI}`)
                    .map((response: Response) => {
                        console.log(response);
                        let balance = parseFloat(response['balance']);
                        return new User(response['_id'], response['name'], response['email'], [response['role']], balance == NaN ? 0 : balance);
                    })
                    .toPromise();
            })
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

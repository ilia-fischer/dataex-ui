import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../shared/user.model';

import 'rxjs/add/operator/map'

const BEARER_TOKEN_KEY = 'bearerToken';
const AUTH_SERVICE_URL = '/assets/mocks/login'

@Injectable()
export class AuthenticationService {
    token = null;

    constructor(private http: HttpClient) { }

    public getToken(): string {
        if(this.token == null){
            let val = localStorage.getItem(BEARER_TOKEN_KEY);
            this.token = val == "null" ? null : val;
        }
        return this.token;
    }

    public setToken(token: string){
        this.token = token;
        localStorage.setItem(BEARER_TOKEN_KEY, token);
    }

    public authenticate(username: string, password: string) : Promise<User>{
        switch(username){
            case 'consumer':
            case 'provider':
            case 'admin':
                if(password != 'password'){
                    return UserNotAuthorizedError();
                }
                break;
            default:
                return UserNotAuthorizedError();
        }

        return this.http.get(`${AUTH_SERVICE_URL}_${username}.json`)
            .map((response: Response) => {
                let token = response["token"];
                console.log(`Token - ${token}`);

                this.setToken(token);
                return response["user"];
            })
            .toPromise();
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        return token != null;
    }
}

function UserNotAuthorizedError(){
    return Promise.reject("Username or password is not valid.");
}
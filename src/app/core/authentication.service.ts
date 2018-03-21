import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../shared/user.model';
import { SettingsService } from './settings.service';

import 'rxjs/add/operator/map'

const BEARER_TOKEN_KEY = 'bearerToken';
const AUTH_SERVICE_URL = '/api/auth/login'

@Injectable()
export class AuthenticationService {
    token = null;

    constructor(private http: HttpClient, private settingsService: SettingsService) { }

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

    public authenticate(username: string, password: string) : Promise<Response>{
        const params = {
            "email": username,
            "password": password
        };

        return this.http.post(`${this.settingsService.apiUrl()}${AUTH_SERVICE_URL}`, params)
            .map((response: Response) => {
                if(response["auth"] == true){
                    let token = response["token"];
                    this.setToken(token);
                    return response;
                }
                throw `Authentication failed. Response: ${response.toString()}`;
            })
            .toPromise();
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        return token != null;
    }

    public isAuthenticationRoute(url: string){
        return url.endsWith(AUTH_SERVICE_URL);
    }
}

function UserNotAuthorizedError(){
    return Promise.reject("Username or password is not valid.");
}
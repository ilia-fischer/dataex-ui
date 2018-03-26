import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

import { SettingsService } from '../core/settings.service';
import { User } from './user.model';


/*
 * This service represents the API interface for 'users'.
 * For the service representing the CURRENT USER see core/user.service
 */
@Injectable()
export class UsersService {
    private static readonly USERS_URL = '/users';

    constructor(private http: HttpClient, private settingsService: SettingsService) { }

    private getBaseUrl(){
        return `${this.settingsService.apiUrl()}${UsersService.USERS_URL}`;
    }

    getAllUsersForAdmin(){
        return this.http.get<User[]>(this.getBaseUrl());
    }
}

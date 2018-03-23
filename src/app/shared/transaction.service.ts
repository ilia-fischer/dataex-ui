import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Transaction } from './transaction.model';
import { User } from './user.model';
import { SettingsService } from '../core/settings.service';
import { UserService } from '../core/user.service';

@Injectable()
export class TransactionService {
  private static readonly TRANSACTION_URL = '/transactions';

  constructor(private http: HttpClient, private settingsService: SettingsService, private userService: UserService) { }

  private getBaseUrl(){
    return `${this.settingsService.apiUrl()}${TransactionService.TRANSACTION_URL}`;
  }

  private getParams(): HttpParams{
    let user = this.userService.getUser();
    let params: HttpParams = new HttpParams();
    if(this.userService.isConsumer()){
      params = params.append('consumer', user.email);
    }
    if(this.userService.isProvider()){
      params = params.append('provider', user.email);
    }
    return params;
  }

  getAllTransactions(){
    let opts = {
      params: this.getParams()
    };
    return this.http.get<Transaction[]>(this.getBaseUrl(), opts);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Transaction } from './Transaction.model';
import { SettingsService } from '../core/settings.service';

@Injectable()
export class TransactionService {
  private static readonly TRANSACTION_URL = '/transactions';

  constructor(private http: HttpClient, private settingsService: SettingsService) { }

  private getBaseUrl(){
    return `${this.settingsService.apiUrl()}${TransactionService.TRANSACTION_URL}`;
  }

  getAllTransactions(){
    return this.http.get<Transaction[]>(this.getBaseUrl());
  }

}

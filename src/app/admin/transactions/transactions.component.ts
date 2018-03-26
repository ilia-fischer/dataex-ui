import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TransactionService } from '../../shared/transaction.service';
import { Transaction } from '../../shared/transaction.model';

@Component({
  selector: 'trdx-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.getAllTransactions()
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
      });
  }

}

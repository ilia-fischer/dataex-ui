import { Component, OnInit, Input } from '@angular/core';

import { Transaction } from '../transaction.model';

@Component({
  selector: 'trdx-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {
  @Input() transactions: Transaction = null;

  constructor() { }

  ngOnInit() {
  }

}

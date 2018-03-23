import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/user.service';
import { TransactionService } from '../../shared/transaction.service';
import { User } from '../../shared/user.model';
import { Transaction } from '../../shared/transaction.model';

@Component({
  selector: 'trdx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  transactions: Transaction[];

  //chart
  view: any[] = [700, 400];
  multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },

    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    },

    {
      "name": "France",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        }
      ]
    }
  ];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private userService: UserService, private transactionService: TransactionService) { }

  ngOnInit() {
    this.user = this.userService.getUser();

    this.transactionService.getAllTransactions()
      .subscribe((transactions: Transaction[]) => this.transactions = transactions);
  }

  onChartSelect(event){
    console.log(event);
  }

}

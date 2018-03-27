import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';

import { UserService } from '../../core/user.service';
import { TransactionService } from '../../shared/transaction.service';
import { User } from '../../shared/user.model';
import { Transaction } from '../../shared/transaction.model';
import { AnalyticsService } from '../../shared/analytics.service';

@Component({
  selector: 'trdx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  balance: number = 0;
  isConsumer: Boolean = false;
  isProvider: Boolean = false;
  transactions: Transaction[] = [];
  recentTransactions: Transaction[] = [];
  timeSeriesAggregateTransactionsNumConsumerNumDataset: any[] = [];

  constructor(private userService: UserService, private transactionService: TransactionService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.isConsumer = this.userService.isConsumer();
    this.isProvider = this.userService.isProvider();

    //'user' including balance is cached per login via localstorage. Get most recent info to update balance.
    this.balance = this.user.balance;
    this.userService.getCurrentUserInfoFromServer()
      .subscribe((u: User) => this.balance = u.balance);

    this.transactionService.getAllTransactions()
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
        this.recentTransactions = transactions.slice(0, 8);
        //bother with this?
        this.timeSeriesAggregateTransactionsNumConsumerNumDataset = this.aggregateTimeSeriesAggregateTransactionsNumConsumerNumDataset();
      });


  }





  //Not sure if this logic works properly yet ...
  private aggregateTimeSeriesAggregateTransactionsNumConsumerNumDataset(){
    //{ "dataset1": { "Daystr": "transactionNumber", "Daystrq": "transactionNumber" }, "dataset2": { } };
    let customersPerDay = {};
    let aggregateObj = this.transactions.reduce( (accumulator, curVal, i) => {
      accumulator[curVal.consumer.consumerId] = accumulator[curVal.consumer.consumerId] || {};
      const day = new Date(curVal.date).toDateString(); //removes time info
      //Transactions
      let series = accumulator[curVal.consumer.consumerId][day] || {
        name: day,
        x: day,
        y: 0,
        r: 0
      };
      series.y++;
      //Customers
      customersPerDay[day] = customersPerDay[day] || new Set<string>();
      customersPerDay[day].add(curVal.consumer.consumerId);

      accumulator[curVal.consumer.consumerId][day] = series;
      return accumulator;
    }, {} );

    //[{"name": "Dataset", "series": [ {"name": "Some Date (DAY)","value": "numTrans"}, {"name": "Some Date (DAY)","value": 8940000 }]}]}}
    let aggregateArr = [];
    for(let ok in aggregateObj){
      let obj = {
        name: ok,
        series: []
      };
      for(let sk in aggregateObj[ok]){
        let series = aggregateObj[ok][sk];
        series.r = customersPerDay[series.x].size;
        obj.series.push(series);
      }
      aggregateArr.push(obj);
    }

    //console.log(aggregateArr);
    return aggregateArr;
  }

}

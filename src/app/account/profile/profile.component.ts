import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

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
  transactions: Transaction[] = [];
  recentTransactions: Transaction[] = [];
  numberOfTransactionsPerUser: any[] = [];
  numberOfTransactionsPerDataset: any[] = [];
  timeSeriesNumberTransactionsPerDataset: any[] = [];
  timeSeriesAggregateTransactionsNumConsumerNumDataset: any[] = []

  //chart
  view: any[] = [700, 400];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private userService: UserService, private transactionService: TransactionService) { }

  ngOnInit() {
    this.user = this.userService.getUser();

    this.transactionService.getAllTransactions()
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
        this.recentTransactions = transactions.slice(0, 8);
        this.numberOfTransactionsPerUser = this.aggregateNumberOfTransactionsPerUser();
        this.numberOfTransactionsPerDataset = this.aggregateNumberOfTransactionsPerDataset();
        this.timeSeriesNumberTransactionsPerDataset = this.aggregateTimeSeriesNumberTransactionsPerDataset();
        this.timeSeriesAggregateTransactionsNumConsumerNumDataset = this.aggregateTimeSeriesAggregateTransactionsNumConsumerNumDataset();
      });
  }

  onChartSelect(event){
    console.log(event);
  }

  private aggregateNumberOfTransactionsPerUser() : any[]{
    let aggregateObj = this.transactions.reduce( (accumulator, curVal, i) => {
      accumulator[curVal.consumer.consumerId] = accumulator[curVal.consumer.consumerId] || 0;
      accumulator[curVal.consumer.consumerId]++;
      return accumulator;
    }, {} );

    let aggregateArr = [];
    for(let k in aggregateObj){
      aggregateArr.push({
          "name": k,
          "value": aggregateObj[k]
      });
    }

    return aggregateArr;
  }

  private aggregateNumberOfTransactionsPerDataset() : any[]{
    let aggregateObj = this.transactions.reduce( (accumulator, curVal, i) => {
      accumulator[curVal.datasetId] = accumulator[curVal.datasetId] || 0;
      accumulator[curVal.datasetId]++;
      return accumulator;
    }, {} );

    let aggregateArr = [];
    for(let k in aggregateObj){
      aggregateArr.push({
          "name": k,
          "value": aggregateObj[k]
      });
    }

    return aggregateArr;
  }

  private aggregateTimeSeriesNumberTransactionsPerDataset(){
    //{ "dataset1": { "Daystr": "transactionNumber", "Daystrq": "transactionNumber" }, "dataset2": { } };
    let aggregateObj = this.transactions.reduce( (accumulator, curVal, i) => {
      accumulator[curVal.datasetId] = accumulator[curVal.datasetId] || {};
      const day = new Date(curVal.date).toDateString(); //removes time info
      accumulator[curVal.datasetId][day] = accumulator[curVal.datasetId][day] || 0;
      accumulator[curVal.datasetId][day]++;
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
        obj.series.push({
          name: new Date(sk).toDateString(),
          value: aggregateObj[ok][sk]
        });
      }
      aggregateArr.push(obj);
    }

    return aggregateArr;
  }


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

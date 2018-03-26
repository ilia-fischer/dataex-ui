import { Injectable } from '@angular/core';

import { Transaction } from './transaction.model';

@Injectable()
export class AnalyticsService {

  constructor() { }

  aggregateNumberOfTransactions(transactions: Transaction[], aggregateBy: (t : Transaction) => any) : any[]{
    let aggregateObj = transactions.reduce( (accumulator, curVal, i) => {
      let aggregateProperty = aggregateBy(curVal);
      accumulator[aggregateProperty] = accumulator[aggregateProperty] || 0;
      accumulator[aggregateProperty]++;
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

  aggregateTimeSeriesNumberTransactions(transactions: Transaction[], aggregateBy: (t : Transaction) => any) : any[]{
    //{ "dataset1": { "Daystr": "transactionNumber", "Daystrq": "transactionNumber" }, "dataset2": { } };
    let aggregateObj = transactions.reduce( (accumulator, curVal, i) => {
      let aggregateProperty = aggregateBy(curVal);
      const day = new Date(curVal.date).toDateString(); //removes time info

      accumulator[aggregateProperty] = accumulator[aggregateProperty] || {};
      accumulator[aggregateProperty][day] = accumulator[aggregateProperty][day] || 0;
      accumulator[aggregateProperty][day]++;
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

}

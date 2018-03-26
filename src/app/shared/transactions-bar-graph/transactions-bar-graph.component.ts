import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Transaction } from '../transaction.model';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'trdx-transactions-bar-graph',
  templateUrl: './transactions-bar-graph.component.html',
  styleUrls: ['./transactions-bar-graph.component.scss']
})
export class TransactionsBarGraphComponent implements OnInit, OnChanges {
  @Input() transactions: Transaction[] = null;
  @Input() aggregateBy: string = "dataset";
  aggregatedTransactions = [];

  private aggregateByDataset = (t: Transaction) => t.datasetId;
  private aggregateByConsumer =(t: Transaction) => t.consumer.consumerId

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit() {
    this.performAggregations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.transactions.currentValue != changes.transactions.previousValue){
      this.performAggregations();
    }
  }

  private performAggregations(){
    switch(this.aggregateBy){
      case 'dataset':
        this.aggregatedTransactions = this.analyticsService.aggregateNumberOfTransactions(this.transactions, this.aggregateByDataset);
        break;
      case 'consumer':
        this.aggregatedTransactions = this.analyticsService.aggregateNumberOfTransactions(this.transactions, this.aggregateByConsumer);
        break;
      default:
        throw `Aggregation type ${this.aggregateBy} is an unknown type. Try 'dataset', 'consumer'.`;
    }
  }

}

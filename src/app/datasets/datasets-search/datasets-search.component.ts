import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/switchMap';

import { GlobalSearchService } from '../../core/global-search/global-search.service';
import { DatasetsService } from '../../shared/dataset.service';
import { Dataset } from '../../shared/dataset.model';

@Component({
  selector: 'trdx-datasets-search',
  templateUrl: './datasets-search.component.html',
  styleUrls: ['./datasets-search.component.scss']
})
export class DatasetsSearchComponent implements OnInit, OnDestroy {
  datasets: Dataset[] = [];
  querySubscription: Subscription;

  constructor(private datasetService: DatasetsService, private globalSearchService: GlobalSearchService) { }

  ngOnInit() {
    //get initial datasets
    this.datasetService.getAllDatasets()
      .subscribe( (datasets: Dataset[]) => this.updateDatasets(datasets) );

    //listen to changes from search box
    this.querySubscription = this.globalSearchService.queryObservable()
      .switchMap((query: string) => this.datasetService.findDatasets(query))
      .subscribe( (datasets: Dataset[]) => this.updateDatasets(datasets) );
  }

  ngOnDestroy(){
    this.querySubscription.unsubscribe();
  }

  private updateDatasets(datasets: Dataset[]){
    this.datasets = datasets as Dataset[]
  }

}

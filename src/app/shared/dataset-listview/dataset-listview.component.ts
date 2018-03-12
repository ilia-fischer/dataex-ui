import { Component, OnInit } from '@angular/core';

import { DatasetsService } from '../dataset.service';
import { Dataset } from '../dataset.model';

@Component({
  selector: 'trdx-dataset-listview',
  templateUrl: './dataset-listview.component.html',
  styleUrls: ['./dataset-listview.component.scss']
})
export class DatasetListviewComponent implements OnInit {
  datasets: Dataset[] = [];

  constructor(private datasetService: DatasetsService) { }

  ngOnInit() {
    this.datasetService.getAllDatasets()
      .subscribe((datasets: Dataset[]) => this.datasets = datasets as Dataset[]);
  }

}

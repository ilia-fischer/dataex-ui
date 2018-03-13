import { Component, OnInit } from '@angular/core';

import { DatasetsService } from '../../shared/dataset.service';
import { Dataset } from '../../shared/dataset.model';

@Component({
  selector: 'trdx-datasets-search',
  templateUrl: './datasets-search.component.html',
  styleUrls: ['./datasets-search.component.scss']
})
export class DatasetsSearchComponent implements OnInit {
  datasets: Dataset[] = [];

  constructor(private datasetService: DatasetsService) { }

  ngOnInit() {
    this.datasetService.getAllDatasets()
      .subscribe((datasets: Dataset[]) => this.datasets = datasets as Dataset[]);
  }

}

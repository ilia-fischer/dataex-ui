import { Component, OnInit, Input } from '@angular/core';

import { Dataset } from '../dataset.model';

@Component({
  selector: 'trdx-dataset-listview',
  templateUrl: './dataset-listview.component.html',
  styleUrls: ['./dataset-listview.component.scss']
})
export class DatasetListviewComponent implements OnInit {
  @Input() datasets: Dataset[] = [];

  constructor() { }

  ngOnInit() {
  }

}

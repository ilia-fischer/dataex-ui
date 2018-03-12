import { Component, OnInit, Input } from '@angular/core';

import { Dataset } from '../dataset.model';

@Component({
  selector: 'trdx-dataset-listview-item',
  templateUrl: './dataset-listview-item.component.html',
  styleUrls: ['./dataset-listview-item.component.scss']
})
export class DatasetListviewItemComponent implements OnInit {
  @Input() dataset: Dataset = null;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

import { DatasetsService } from '../../shared/dataset.service';
import { Dataset } from '../../shared/dataset.model';
import { UserService } from '../../core/user.service';
import { User } from '../../shared/user.model';

@Component({
  selector: 'trdx-purchased-datasets',
  templateUrl: './purchased-datasets.component.html',
  styleUrls: ['./purchased-datasets.component.scss']
})
export class PurchasedDatasetsComponent implements OnInit {
  datasets: Dataset[];

  constructor(private userService: UserService, private datasetsService: DatasetsService) { }

  ngOnInit() {
    this.datasetsService.getPurchasedDatasets( this.userService.getUser() )
      .subscribe((datasets: Dataset[]) => this.datasets = datasets);
  }

}

import { Component, OnInit } from '@angular/core';

import { DatasetsService } from '../../shared/dataset.service';
import { Dataset } from '../../shared/dataset.model';
import { UserService } from '../../core/user.service';
import { User } from '../../shared/user.model';


@Component({
  selector: 'trdx-provided-datasets',
  templateUrl: './provided-datasets.component.html',
  styleUrls: ['./provided-datasets.component.scss']
})
export class ProvidedDatasetsComponent implements OnInit {
  datasets: Dataset[];

  constructor(private userService: UserService, private datasetsService: DatasetsService) { }

  ngOnInit() {
    this.datasetsService.getProvidedDatasets( this.userService.getUser() )
      .subscribe((datasets: Dataset[]) => this.datasets = datasets);
  }

}

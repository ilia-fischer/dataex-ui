import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { DatasetsService } from '../../shared/dataset.service';
import { Dataset } from '../../shared/dataset.model';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'trdx-datasets-detail.',
  templateUrl: './datasets-detail.component.html',
  styleUrls: ['./datasets-detail.component.scss']
})
export class DatasetsDetailComponent implements OnInit {
  datasetId: string;
  dataset: Dataset = null;
  idNotFound: Boolean = false;

  //chart
  view: any[] = [700, 400];

  single = [{name: '', value: 0}];

  colorScheme = {
    domain: ['#E37222', '#07889B', '#66B9BF', '#EEAA7B', '#FCEFEF']
  };

  graphView: any[] = [700, 400];

  graph = {
      nodes: [
        {value: "Myriel", group: 1},
        {value: "Napoleon", group: 1}
      ],
      links: [
         {source: "Napoleon", target: "Myriel", value: 1}
      ]
  };

  relationsTreeMap = [
    {
      "name": "Germany",
      "value": 40632
    },
    {
      "name": "United States",
      "value": 49737
    }
  ];

  allDatasets: Dataset[];

  constructor(private route: ActivatedRoute, private datasetService: DatasetsService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.route.params
      .switchMap( (params) => {
        this.datasetId = params.id;
        return this.datasetService.getDataSetById(this.datasetId);
      })
      .subscribe((ds: Dataset) => {
        if(ds == null || typeof ds === 'undefined'){
          this.idNotFound = true;
        }
        else {
          this.dataset = ds;
          this.datasetService.getAllDatasets()
            .subscribe( (datasets: Dataset[]) => {
                this.allDatasets = datasets;
                /*
                ** chart
                */
                var counter = [];
                this.dataset.categories.map((ct) => {counter[ct] = 0});
                datasets.map((next) => {
                  next.categories.map(ct => {
                    if(ct in counter)
                      counter[ct]++;
                  });
                });
                this.single = Object.entries(counter).map(([ct, count]) => ({name: ct, value: parseInt(count)}));
                /*
                ** graph
                */
                this.graph.nodes = [];
                this.graph.links = [];
                this.graph.nodes.push({value: this.dataset.name, group: 1});
                datasets.map((next) => {
                  this.graph.nodes.push({value: next.name, group: 1});
                });
                datasets.map((next) => {
                  next.categories.map(ct => {
                    if(this.dataset.categories.find(current => current == ct))
                      this.graph.links.push({source: this.dataset.name, target: next.name, value: 1 });
                  });
                });
                /*
                ** Treemap
                */
                var counterTreeMap = [];
                datasets.map((next) => {
                  counterTreeMap[next.name] = 0;
                  next.categories.map(ct => {
                    if(this.dataset.categories.find(current => current == ct))
                      counterTreeMap[next.name]++;
                  });
                });
                this.relationsTreeMap = Object.entries(counterTreeMap)
                .filter(([name, count]) => (name != this.dataset.name && count > 0))
                .map(([name, count]) => ({name: name, value: parseInt(count)}));
            });
        }
      });
    }

    purchaseDataset(){
    // const initialState = {
    //   dataset: this.dataset
    // };
    // this.bsModalRef = this.modalService.show(PurchaseDatasetModalComponent, {initialState});

    }

    onChartSelect(event){
      if(this.userService.isConsumer())
        this.router.navigateByUrl(`/datasets?search=${event.name}`);
    }

    onGraphSelect(event){
      var id = this.allDatasets.find(x => x.name == event.name)._id;
      this.router.navigateByUrl(`/datasets/${id}`);
    }

    onSelectTreeMap(event){
      var id = this.allDatasets.find(x => x.name == event.name)._id;
      this.router.navigateByUrl(`/datasets/${id}`);
    }

    xAxisTickFormatting(value) {
      if(parseInt(value) == value)
        return parseInt(value);
      else
        return '';
    }

}

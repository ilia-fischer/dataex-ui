import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import { Dataset } from './dataset.model';
import { User } from './user.model';

const DATASET_URL = './assets/mocks/datasets.json';

@Injectable()
export class DatasetsService {
  constructor(private http: Http) { }

  getAllDatasets(): Observable<Dataset[]>{
    return this.http.get(DATASET_URL)
      .map((response: Response) => {
        return response.json()
      });
  }

  getDataSetById(id: string): Observable<Dataset>{
    return this.http.get(DATASET_URL)
      .map((response: Response) => {
        let dsa: Dataset[] = response.json();
        return dsa.find( ds=> ds.id === id );
      });
  }

  getProvidedDatasets(user: User): Observable<Dataset[]>{
    return this.http.get(DATASET_URL)
      .map((response: Response) => {
        let dsa: Dataset[] = response.json();
        return dsa.filter( ds => {
          return ds.provider.id === user.id
         } );
      });
  }

  getPurchasedDatasets(user: User): Observable<Dataset[]>{
    return this.http.get(DATASET_URL)
      .map((response: Response) => {
        let dsa: Dataset[] = response.json();
        return dsa.slice(0, Math.round(dsa.length/2));
      });
  }

//   getDatasets(query, facets): Observable<Dataset[]>{
//     return this.http.get(DATASET_URL)
//       .map((response: Response) => {
//         let datasets = response.json();
//         return datasets.filter( ds => ds.name.toLowerCase().includes(query.toLowerCase()) );
//       });
//   }

}

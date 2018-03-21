import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';

import { Dataset } from './dataset.model';
import { User } from './user.model';
import { SettingsService } from '../core/settings.service';

const DATASET_URL = './assets/mocks/datasets.json';

@Injectable()
export class DatasetsService {
  private static readonly DATASET_URL = '/datasets';

  constructor(private http: HttpClient, private settingsService: SettingsService) { }

  private getBaseUrl(){
    return `${this.settingsService.apiUrl()}${DatasetsService.DATASET_URL}`;
  }

  getAllDatasets(): Observable<Dataset[]>{
    return this.http.get<Dataset[]>(this.getBaseUrl());
  }

  getDataSetById(id: string): Observable<Dataset>{
    return this.http.get<Dataset>(`${this.getBaseUrl()}/${id}`);
  }

  getProvidedDatasets(user: User): Observable<Dataset[]>{
    return this.http.get<Dataset[]>(`${this.getBaseUrl()}?provider=${encodeURIComponent(user.email)}`);
  }

  getPurchasedDatasets(user: User): Observable<Dataset[]>{
    /*
     * TODO: fix once server method is implemented
     */
    return this.getAllDatasets();
  }

  findDatasets(query: string): Observable<Dataset[]>{
    return this.getAllDatasets()
      .map((datasets: Dataset[]) => {
          return datasets.filter( ds => {
            return ds.name.toLowerCase().includes(query) ||
              ds.description.toLowerCase().includes(query) ||
              ds.categories.find((s) => s.includes(query))
          } );
        });
  }
}

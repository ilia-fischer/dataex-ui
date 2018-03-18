import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Injectable()
export class GlobalSearchService {
  querySubject = new Subject<string>();

  constructor() {}

  queryObservable() : Observable<string>{
    return this.querySubject.asObservable()
      .debounceTime(250)
      .distinctUntilChanged();
  }

  isActive(): boolean{
    return this.querySubject.observers.length > 0;
  }

  update(query: string){
    this.querySubject.next(query);
  }

}

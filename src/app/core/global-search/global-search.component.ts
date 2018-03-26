import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalSearchService } from './global-search.service'
import { interval } from 'rxjs/observable/interval';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'trdx-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent implements OnInit, OnDestroy {
  query: string;
  isActive: boolean;
  intervalSubscription: Subscription;

  constructor(private globalSearchService: GlobalSearchService) { }

  ngOnInit() {
    /*
     * This is a hack.
     * Problem: we want the search UI to only be visible when there are subscribers on
     *    globalSearchService. globalSearchService.isActive() will return this but not as
     *    an Observable. You can use Observer.of/from to wrap the subject.observers array into
     *    into an Observable but there is still no change detection. For POC sake
     *    I just do this interval hack to get the same idea. Need a better way if this POC is
     *    ever taken beyond a demo. Note: the interval code is in the component rather than the service
     *    so that we can unsubscribe to the interval.
     */
    this.intervalSubscription = interval(200).subscribe(() => {
      this.isActive = this.globalSearchService.isActive();
    });

    /*
     * This is for the requirement of the search UI updating if another page makes the change
     * itself (like datasets setting the search from the url parameter)
     */
    this.globalSearchService.queryObservable()
      .subscribe( (_query :string) => {
        if(this.query != _query){
          this.query = _query;
        }
      });
  }

  onChange(newVal){
    this.query = newVal;
    this.globalSearchService.update(this.query);
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }

}

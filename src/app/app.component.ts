import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'tdrx-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Thomson Reuters Data Exchange";

  public constructor(private titleService: Title ) {
    this.titleService.setTitle( this.title );
  }
}

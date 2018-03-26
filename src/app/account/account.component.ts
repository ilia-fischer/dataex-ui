import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../core/user.service';

@Component({
  selector: 'trdx-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  menuItems = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.menuItems = [
      { name: "Profile", route: "", active: false, visible: true},
      { name: "Provided Datasets", route: "my-datasets", active: false, visible: this.userService.isProvider()},
      { name: "Purchased Datasets", route: "purchased-datasets", active: false, visible: this.userService.isConsumer()}
    ];

    this.menuItems.forEach( mi => {
      let route = mi.route === "" ? "" : `/${mi.route}`;
      if(this.router.url == `/account${route}`){
        mi.active = true;
      }
    });
  }

  selectMenuItem(item){
    this.menuItems.forEach( i => {
      i.active = (i.name == item.name);
    });
    this.router.navigate([`/account/${item.route}`]);
  }

}

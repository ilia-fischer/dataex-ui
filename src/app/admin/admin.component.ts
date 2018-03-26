import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'trdx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menuItems = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = [
      { name: "Transactions", route: "", active: false},
      { name: "Users", route: "users", active: false}
    ];

    this.menuItems.forEach( mi => {
      let route = mi.route === "" ? "" : `/${mi.route}`;
      if(this.router.url == `/admin${route}`){
        mi.active = true;
      }
    });
  }

  selectMenuItem(item){
    this.menuItems.forEach( i => {
      i.active = (i.name == item.name);
    });
    this.router.navigate([`/admin/${item.route}`]);
  }

}

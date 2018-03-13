import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'trdx-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  menuItems = [
    { name: "Profile", route: "", active: true},
    { name: "My Datasets", route: "my-datasets", active: false},
    { name: "My Purchased Datasets", route: "purchased-datasets", active: false}
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  selectMenuItem(item){
    this.menuItems.forEach( i => {
      i.active = (i.name == item.name);
    });
    this.router.navigate([`/account/${item.route}`]);
  }

}

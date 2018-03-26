import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../shared/users.service';
import { User } from '../../shared/user.model';

@Component({
  selector: 'trdx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getAllUsersForAdmin()
      .subscribe( (users: User[]) => this.users = users );
  }

}

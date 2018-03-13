import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/user.service';
import { User } from '../../shared/user.model';

@Component({
  selector: 'trdx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

}

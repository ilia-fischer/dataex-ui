import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { PageService } from '../core/page.service';

@Component({
  selector: 'trdx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidCredentialsError = false;

  constructor(private userService: UserService, private pageService: PageService) { }

  ngOnInit() { }

  submit(form){
    let u = form.form.value.username;
    let p = form.form.value.password;

    this.userService.signIn(u, p)
      .then(() => {
        console.debug(`Sign in for ${u} is successful.`);
        this.invalidCredentialsError = false;
        this.pageService.goToDefaultPage();
      })
      .catch((err) => {
        console.error(`Sign in for ${u} was unsuccessful. Details: `, err);
        this.invalidCredentialsError = true;
        form.reset();
      });
  }
}

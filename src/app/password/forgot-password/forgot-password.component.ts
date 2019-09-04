import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form = {
    email: null,
    url: null
  };
  model: any = {};


  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  sendResetLink() {
    this.authService.sendForgotPasswordLink(this.form).subscribe(() => {
      this.alertify.success('Email has been sent');
      this.form.email = null;
    }, error => {
      this.alertify.error(error);
    });
  }

}

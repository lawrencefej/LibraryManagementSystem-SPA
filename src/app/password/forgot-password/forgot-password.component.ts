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
  hostname: string;


  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.hostname = 'http://localhost:4200/resetpassword';
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  sendResetLink() {
    this.form.url = this.hostname;
    this.authService.sendForgotPasswordLink(this.form).subscribe(() => {
      this.alertify.success('Email has been sent');
      this.form.email = null;
    }, error => {
      this.alertify.error(error);
    });
  }

}

import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  model: any = {};
  hostname: string;


  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.hostname = 'localhost:4200/resetpassword';
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  sendResetLink() {
    this.model.url = this.hostname;
    console.log(this.model);
  }

}

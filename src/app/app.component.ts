import { Component, OnInit } from '@angular/core';

import { AuthService } from './_services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  currentUser: User;
  isVisible = false;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    // if (user) {
    //   this.authService.currentUser = user;
    // }
  }

    get isAdmin() {
      if (this.currentUser) {
        if (this.currentUser.role === 'Admin' || this.currentUser.role === 'Librarian') {
          return true;
        }
      }
      return false;
      // return this.authService.isAdmin(this.currentUser);
  }
}

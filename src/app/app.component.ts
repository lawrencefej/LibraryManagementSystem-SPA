import { Component, OnInit } from '@angular/core';

import { AuthService } from './_services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { User } from './_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  currentUser: User;
  isVisible = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  // showNav() {
  //   // console.log(this.router.url);
  //   if (this.loggedIn) {
  //     if (this.router.url === '/dashboard') {
  //       return false;
  //     }
  //     return true;
  //   }
  //   return false;
  // }

  showNav() {
    // console.log(this.router.url);
    if (this.authService.loggedIn()) {
      if (this.router.url === '/dashboard') {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

    get isAdmin() {
      if (this.currentUser) {
        if (this.currentUser.role === 'Admin' || this.currentUser.role === 'Librarian') {
          return true;
        }
      }
      return false;
  }
}

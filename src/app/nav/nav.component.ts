import { Component, OnInit } from '@angular/core';

import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  currentUser: User;

  constructor(public authService: AuthService, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
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

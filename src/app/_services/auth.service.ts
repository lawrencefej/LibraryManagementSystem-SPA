import { BehaviorSubject, Observable } from 'rxjs';

import { AlertifyService } from './alertify.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = environment.apiUrl + 'auth/';
  decodedToken: any;
  currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');

constructor(private http: HttpClient, private router: Router,
  private alertify: AlertifyService, private jwtHelper: JwtHelperService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.currentUser = this.currentUserSubject.asObservable();
  }

login(model: any) {
  return this.http
  .post(this.baseurl + 'login', model)
  .pipe(
    map(( response: any) => {
      const user = response;
      if (user && user.token) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        // this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
        // this.currentUser = user.user;
        this.currentUserSubject.next(user.user);
      }

      return user.user;
    })
  );
}

register(user: User) {
  return this.http.post(this.baseurl + 'auth/register', user);
}

public get currentUserValue(): User {
  return this.currentUserSubject.value;
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.decodedToken = null;
  this.currentUser = null;
  this.currentUserSubject.next(null);
  this.router.navigate(['/login']);
  this.alertify.message('logged out');
}

roleMatch(allowedRoles): boolean {
  let isMatch = false;
  // const userRoles = this.decodedToken.role as Array<string>;
  const userRoles = this.jwtHelper.decodeToken(localStorage.getItem('token')) as Array<string>;
  allowedRoles.forEach(element => {
    if (userRoles.includes(element)) {
      isMatch = true;
      return;
    }
  });
  return isMatch;
  }

  isAdmin(model: any) {
    if (this.currentUser) {
      if (this.currentUserValue.role === 'Admin' || this.currentUserValue.role === 'Librarian') {
        return true;
      }
    }
    return false;
  }

  sendForgotPasswordLink(model: any) {
    return this.http.post(this.baseurl + 'forgotpassword', model);
  }

  resetPassword(model: any) {
    return this.http.post(this.baseurl + 'resetpassword', model);
  }

}

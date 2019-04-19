import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const allowedRoles = next.firstChild.data['allowedRoles'] as Array<string>;

    if (allowedRoles) {
      if (this.authService.loggedIn) {
        if (this.authService.isAuthorized(allowedRoles)) {
          return true;
        }
        this.blockAccess();
      }
      this.login(state);
    }

    if (this.authService.loggedIn()) {
      return true;
    }

    this.login(state);
  }

  blockAccess() {
    // this.authService.logout();
    this.alertify.error('Access Denied');
    this.router.navigate(['/']);
    return false;
  }

  login(state: any) {
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}

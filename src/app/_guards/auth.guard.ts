import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = next.firstChild.data['roles'] as Array<string>;
    if (roles) {
      // const match = this.authService.roleMatch(roles);
      const userRole = this.authService.currentUserValue.role;
      if (roles.includes(userRole)) {
        return true;
      } else {
        this.router.navigate(['members']);
        this.alertify.error('You are not authorized to access this area');
      }
    }
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('Please Login');
    this.router.navigate(['/login']);
    return false;

    // const currentUser = this.authService.currentUserValue;
    //     if (currentUser) {
    //         // check if route is restricted by role
    //         if (next.data.roles && next.data.roles.indexOf(currentUser.role) === -1) {
    //             // role not authorised so redirect to home page
    //             this.router.navigate(['/']);
    //             return false;
    //         }

    //         // authorised so return true
    //         return true;
    //     }

    //     // not logged in so redirect to login page with the return url
    //     this.alertify.error('Please Login');
    //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    //     return false;
  }
}

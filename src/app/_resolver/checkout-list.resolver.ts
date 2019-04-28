import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AlertifyService } from '../_services/alertify.service';
import { Checkout } from '../_models/checkout';
import { CheckoutService } from '../_services/checkout.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CheckoutListResolver implements Resolve<Checkout[]> {
  pageNumber = 1;
  pageSize = 5;
  constructor (private checkoutService: CheckoutService,
    private router: Router, private alertify: AlertifyService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Checkout[]> {
      return this.checkoutService.getPaginatedAuthors(this.pageNumber, this.pageSize).pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/memberSearch']);
          return of(null);
        })
        );
    }
}
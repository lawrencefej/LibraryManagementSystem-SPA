import { MemberService } from './../_services/member.service';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 5;

  constructor(private memberService: MemberService, private router: Router,
    private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.memberService.getPaginatedMembers(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/memberSearch']);
        return of(null);
      })
    );
  }
}

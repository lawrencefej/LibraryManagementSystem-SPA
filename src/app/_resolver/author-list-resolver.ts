import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AuthorService } from '../_services/author.service';
import { Author } from '../_models/author';

@Injectable()
export class AuthorListResolver implements Resolve<Author[]> {
  pageNumber = 1;
  pageSize = 5;
  constructor(private authorService: AuthorService,
    private router: Router, private alertify: AlertifyService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Author[]> {
    return this.authorService.getPaginatedAuthors(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/memberSearch']);
        return of(null);
      })
    );
  }
}

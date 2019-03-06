import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { Injectable } from '@angular/core';
import { LibraryAsset } from '../_models/libraryAsset';
import { catchError } from 'rxjs/operators';
import { AuthorService } from '../_services/author.service';
import { Author } from '../_models/author';

@Injectable()
export class AuthorAssetResolver implements Resolve<Author> {
  constructor(private router: Router, private alertify: AlertifyService, private authorService: AuthorService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Author> {
    return this.authorService.getAuthor(route.params['id']).pipe(
      catchError(() => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/authors']);
        return of(null);
      })
    );
  }
}

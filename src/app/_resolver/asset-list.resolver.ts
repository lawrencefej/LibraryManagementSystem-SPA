import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { LibraryAsset } from '../_models/libraryAsset';
import { AssetService } from '../_services/asset.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AssetListResolver implements Resolve<LibraryAsset[]> {
  pageNumber = 1;
  pageSize = 5;
  constructor (private assetService: AssetService,
    private router: Router, private alertify: AlertifyService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<LibraryAsset[]> {
      return this.assetService.getPaginatedAssets(this.pageNumber, this.pageSize).pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/memberSearch']);
          return of(null);
        })
        );
    }
}

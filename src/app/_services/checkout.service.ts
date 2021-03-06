import { Checkout } from '../_models/checkout';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Author } from '../_models/author';
import { LibraryAsset } from '../_models/libraryAsset';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
  private checkout = new Subject<Checkout>();

  constructor(private http: HttpClient) { }

  getCheckout(checkoutId: number): Observable<Checkout> {
    return this.http.get<Checkout>(this.baseUrl + 'checkouts/' + checkoutId);
  }

  getCheckouts(): Observable<Checkout[]> {
    return this.http.get<Checkout[]>(this.baseUrl + 'checkouts/');
  }

  getCheckoutsForMember(userId: number): Observable<Checkout[]> {
    return this.http.get<Checkout[]>(this.baseUrl + 'checkouts/user/' + userId);
  }

  searchCheckouts(searchString: string): Observable<Checkout[]> {
    return this.http.get<Checkout[]>(this.baseUrl + 'checkouts/search?SearchString=' + searchString);
  }

  returnAsset(id: number) {
    return this.http.put(this.baseUrl + 'checkouts/' + id, {});
  }

  getCheckoutsForAsset(assetId: number): Observable<Checkout[]> {
    return this.http.get<Checkout[]>(this.baseUrl + 'checkouts/asset/' + assetId);
  }

  checkoutAsset(checkout: Checkout) {
    return this.http.post(this.baseUrl + 'checkouts/', checkout);
  }

  getNewCheckout(): Observable<Checkout> {
    return this.checkout.asObservable();
  }

  sendNewCheckout(checkout: Checkout) {
    this.checkout.next(checkout);
  }

  getPaginatedAuthors(page?, itemsPerPage?): Observable<PaginatedResult<Checkout[]>> {
    const paginatedResult: PaginatedResult<Checkout[]> = new PaginatedResult<Checkout[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pagenumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Checkout[]>(this.baseUrl + 'checkouts/pagination', {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }
}

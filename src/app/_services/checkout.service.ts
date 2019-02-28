import { Checkout } from '../_models/checkout';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

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

  searchCheckouts(searchString): Observable<Checkout[]> {
    return this.http.get<Checkout[]>(this.baseUrl + 'checkouts/search?SearchString=' + searchString);
  }

  getCheckoutsForAsset(assetId: number): Observable<Checkout[]> {
    return this.http.get<Checkout[]>(this.baseUrl + 'checkouts/asset/' + assetId);
  }

  checkoutAsset(checkout: Checkout) {
    return this.http.post(this.baseUrl + 'checkouts/', checkout);
  }
}

import { Checkout } from '../_models/checkout';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReserveAsset } from '../_models/reserveAsset';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  reserveAsset(userId: number, assetId: number) {
    return this.http.post(this.baseUrl + userId + '/reserve/' + assetId, {});
  }

  getReserves(userId: number): Observable<ReserveAsset[]> {
    return this.http.get<ReserveAsset[]>(this.baseUrl + userId + '/reserve/');
  }

  getReserve(userId: number, reserveId: number): Observable<ReserveAsset> {
    return this.http.get<ReserveAsset>(this.baseUrl + userId + 'reserve/' + reserveId);
  }

  getCheckout(userId: number): Observable<Checkout[]> {
    return this.http.get<ReserveAsset[]>(this.baseUrl + userId + '/reserve/checkout');
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'user/' + id);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'user/');
  }

}

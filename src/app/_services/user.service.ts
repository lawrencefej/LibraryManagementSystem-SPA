import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReserveAsset } from '../_models/reserveAsset';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Checkout } from '../_models/checkout';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

reserveAsset(userId: number, reserve: ReserveAsset) {
  return this.http.post(this.baseUrl + userId + '/reserve/', reserve);
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

}

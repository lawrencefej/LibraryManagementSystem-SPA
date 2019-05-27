import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeesService {

constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;

  payFees(libraryCardID: number) {
    return this.http.post(this.baseUrl + 'fee/' + libraryCardID, {});
  }

}

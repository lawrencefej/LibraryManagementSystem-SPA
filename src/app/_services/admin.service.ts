import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;

  getAdmins() {
    return this.http.get<User[]>(this.baseUrl + 'admin');
  }

  AddUser(user: User) {
    return this.http.post(this.baseUrl + 'admin/', user);
  }

}

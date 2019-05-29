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

  addUser(user: User) {
    return this.http.post(this.baseUrl + 'admin/', user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + 'admin/', user);
  }

  deleteUser(userId: number) {
    return this.http.delete(this.baseUrl + 'admin/' + userId);
  }

}

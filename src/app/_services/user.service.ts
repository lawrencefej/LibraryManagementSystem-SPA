import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'user/' + id);
  }

  getMemberByCardNumber(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'user/card/' + id);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'user/');
  }

  searchMembers(searchString): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'user/search?SearchString=' + searchString);
  }

  // advancedMemberSearch(params: any): Observable<HttpResponse<User[]>> {
  //   return this.http.get<User[]>(this.baseUrl + 'user/searchMembers', {observe: 'response', params});
  // }

  advancedMemberSearch(params: any): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'user/' + params);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'user/' + id, user);
  }

  AddMember(user: User) {
    return this.http.post(this.baseUrl + 'user/', user);
  }

}

import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private states: any[] = [
    { id: 1, name: 'Alabama', region: 'South' },
    { id: 2, name: 'Alaska', region: 'West' },
    { id: 3, name: 'Arizona', region: 'West' },
    { id: 4, name: 'Arkansas', region: 'South' },
    { id: 5, name: 'California', region: 'West' },
    { id: 6, name: 'Colorado', region: 'West' },
    { id: 7, name: 'Connecticut', region: 'Northeast' },
    { id: 8, name: 'Delaware', region: 'South' },
    { id: 9, name: 'Florida', region: 'South' },
    { id: 10, name: 'Georgia', region: 'South' },
    { id: 11, name: 'Hawaii', region: 'West' },
    { id: 12, name: 'Idaho', region: 'West' },
    { id: 13, name: 'Illinois', region: 'Midwest' },
    { id: 14, name: 'Indiana', region: 'Midwest' },
    { id: 15, name: 'Iowa', region: 'Midwest' },
    { id: 16, name: 'Kansas', region: 'Midwest' },
    { id: 17, name: 'Kentucky', region: 'South' },
    { id: 18, name: 'Louisiana', region: 'South' },
    { id: 19, name: 'Maine', region: 'Northeast' },
    { id: 21, name: 'Maryland', region: 'South' },
    { id: 22, name: 'Massachusetts', region: 'Northeast' },
    { id: 23, name: 'Michigan', region: 'Midwest' },
    { id: 24, name: 'Minnesota', region: 'Midwest' },
    { id: 25, name: 'Mississippi', region: 'South' },
    { id: 26, name: 'Missouri', region: 'Midwest' },
    { id: 27, name: 'Montana', region: 'West' },
    { id: 28, name: 'Nebraska', region: 'Midwest' },
    { id: 29, name: 'Nevada', region: 'West' },
    { id: 30, name: 'New Hampshire', region: 'Northeast' },
    { id: 31, name: 'New Jersey', region: 'Northeast' },
    { id: 32, name: 'New Mexico', region: 'West' },
    { id: 33, name: 'New York', region: 'Northeast' },
    { id: 34, name: 'North Dakota', region: 'Midwest' },
    { id: 35, name: 'North Carolina', region: 'South' },
    { id: 36, name: 'Ohio', region: 'Midwest' },
    { id: 37, name: 'Oklahoma', region: 'South' },
    { id: 38, name: 'Oregon', region: 'West' },
    { id: 39, name: 'Pennsylvania', region: 'Northeast' },
    { id: 40, name: 'Rhode Island', region: 'Northeast' },
    { id: 41, name: 'South Carolina', region: 'South' },
    { id: 42, name: 'South Dakota', region: 'Midwest' },
    { id: 43, name: 'Tennessee', region: 'South' },
    { id: 44, name: 'Texas', region: 'South' },
    { id: 45, name: 'Utah', region: 'West' },
    { id: 46, name: 'Vermont', region: 'Northeast' },
    { id: 47, name: 'Virginia', region: 'South' },
    { id: 48, name: 'Washington', region: 'South' },
    { id: 49, name: 'West Virginia', region: 'South' },
    { id: 50, name: 'Wisconsin', region: 'Midwest' },
    { id: 51, name: 'Wyoming', region: 'West' }
  ];
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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

  advancedMemberSearch(params: any): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'user/' + params);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'user/' + id, user);
  }

  deleteUser(memberId: number) {
    return this.http.delete(this.baseUrl + 'user/' + memberId);
  }

  AddMember(user: User) {
    return this.http.post(this.baseUrl + 'user/', user);
  }

  getPaginatedMembers(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pagenumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<User[]>(this.baseUrl + 'user/pagination', { observe: 'response', params })
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

  getStates() {
    return this.states;
  }
}

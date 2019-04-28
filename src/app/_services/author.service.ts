import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Author } from '../_models/author';
import { Observable } from 'rxjs';
import { LibraryAsset } from '../_models/libraryAsset';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAuthor(id): Observable<Author> {
    return this.http.get<Author>(this.baseUrl + 'author/' + id);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl + 'author/');
  }

  searchAuthors(searchString): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl + 'author/search?SearchString=' + searchString);
  }

  updateAuthors(author: Author) {
    return this.http.put(this.baseUrl + 'author/', author);
  }

  getAssetForAuthor(authorId: number): Observable<LibraryAsset[]> {
    return this.http.get<LibraryAsset[]>(this.baseUrl + 'catalog/author/' + authorId);
  }

  addAuthor(author: Author) {
    return this.http.post(this.baseUrl + 'author/', author);
  }

  getPaginatedAuthors(page?, itemsPerPage?): Observable<PaginatedResult<Author[]>> {
    const paginatedResult: PaginatedResult<Author[]> = new PaginatedResult<Author[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pagenumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<LibraryAsset[]>(this.baseUrl + 'author/pagination', {observe: 'response', params})
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

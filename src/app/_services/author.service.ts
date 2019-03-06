import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Author } from '../_models/author';
import { Observable } from 'rxjs';
import { LibraryAsset } from '../_models/libraryAsset';

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
}

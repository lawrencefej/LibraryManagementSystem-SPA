import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryAsset } from '../_models/libraryAsset';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAssets(): Observable<LibraryAsset[]> {
    return this.http.get<LibraryAsset[]>(this.baseUrl + 'catalog/');
  }

  getAsset(id): Observable<LibraryAsset> {
    return this.http.get<LibraryAsset>(this.baseUrl + 'catalog/' + id);
  }

  searchAsset(name): Observable<LibraryAsset[]> {
    return this.http.get<LibraryAsset[]>(this.baseUrl + 'catalog/search?SearchString=' + name);
  }

  getAssetForAuthor(authorId: number): Observable<LibraryAsset> {
    return this.http.get<LibraryAsset>(this.baseUrl + 'catalog/author/' + authorId);
  }

}

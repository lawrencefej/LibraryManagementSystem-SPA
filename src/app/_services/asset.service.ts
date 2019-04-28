import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryAsset } from '../_models/libraryAsset';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

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

  addAuthor(asset: LibraryAsset) {
    return this.http.post(this.baseUrl + 'catalog/', asset);
  }

  updateAsset(id: number, asset: LibraryAsset) {
    return this.http.put(this.baseUrl + 'catalog/' + id, asset);
  }

  getPaginatedAssets(page?, itemsPerPage?): Observable<PaginatedResult<LibraryAsset[]>> {
    const paginatedResult: PaginatedResult<LibraryAsset[]> = new PaginatedResult<LibraryAsset[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pagenumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<LibraryAsset[]>(this.baseUrl + 'catalog/pagination', {observe: 'response', params})
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

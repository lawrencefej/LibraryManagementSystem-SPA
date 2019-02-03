import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LibraryAsset } from '../_models/libraryAsset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAssets(): Observable<LibraryAsset[]> {
    return this.http.get<LibraryAsset[]>(this.baseurl + 'catalog/');
  }

  getAsset(id): Observable<LibraryAsset> {
    return this.http.get<LibraryAsset>(this.baseurl + 'catalog/' + id);
  }

}

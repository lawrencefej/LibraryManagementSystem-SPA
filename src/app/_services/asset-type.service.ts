import { Injectable } from '@angular/core';
import { AssetType } from '../_models/assetType';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetTypeService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

  getCategory(id): Observable<AssetType> {
    return this.http.get<AssetType>(this.baseUrl + 'assettype/' + id);
  }

  getCategories(): Observable<AssetType[]> {
    return this.http.get<AssetType[]>(this.baseUrl + 'assettype/');
  }

}

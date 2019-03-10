import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AssetType } from '../_models/assetType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

  getAssetType(id): Observable<AssetType> {
    return this.http.get<AssetType>(this.baseUrl + 'assettype/' + id);
  }

  getAssetTypes(): Observable<AssetType[]> {
    return this.http.get<AssetType[]>(this.baseUrl + 'assettype/');
  }

}

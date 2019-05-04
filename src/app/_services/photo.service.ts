import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  changeMemberPhoto(data: any) {
    return this.http.post(this.baseUrl + 'photo/userPhoto', data);
  }

  changeAssetPhoto(data: any) {
    return this.http.post(this.baseUrl + 'photo/assetPhoto', data);
  }
}

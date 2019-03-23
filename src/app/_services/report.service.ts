import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartModel } from '../_models/chartModel';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAssetDistribution(): Observable<ChartModel> {
    return this.http.get<ChartModel>(this.baseUrl + 'reports/assetDistribution');
  }

  getCheckoutBymonth(): Observable<ChartModel> {
    return this.http.get<ChartModel>(this.baseUrl + 'reports/byMonth');
  }

  getCheckoutByDay(): Observable<ChartModel> {
    return this.http.get<ChartModel>(this.baseUrl + 'reports/byDay');
  }

  getReturnByDay(): Observable<ChartModel> {
    return this.http.get<ChartModel>(this.baseUrl + 'reports/returns');
  }

}
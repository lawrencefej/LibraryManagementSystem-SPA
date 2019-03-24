import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartModel } from '../_models/chartModel';
import { TotalsReport } from '../_models/totalsReport';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAssetDistribution(): Observable<ChartModel> {
    return this.http.get<ChartModel>(this.baseUrl + 'reports/assetDistribution');
  }

  getCategoryDistribution(): Observable<ChartModel> {
    return this.http.get<ChartModel>(this.baseUrl + 'reports/CategoryDistribution');
  }

  getCheckoutByMonth(): Observable<ChartModel> {
    return this.http.get<ChartModel>(this.baseUrl + 'reports/byMonth');
  }

  getReturnsByMonth(): Observable<ChartModel> {
    return this.http.get<ChartModel>(this.baseUrl + 'reports/returnsByMonth');
  }

  getCheckoutByDay(): Observable<ChartModel> {
    return this.http.get<ChartModel>(this.baseUrl + 'reports/byDay');
  }

  getReturnByDay(): Observable<ChartModel> {
    return this.http.get<ChartModel>(this.baseUrl + 'reports/returns');
  }

  getTotals(): Observable<TotalsReport> {
    return this.http.get<TotalsReport>(this.baseUrl + 'reports/totals');
  }

}

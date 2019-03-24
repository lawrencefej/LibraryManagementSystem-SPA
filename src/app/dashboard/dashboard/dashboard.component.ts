import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/_services/report.service';
import { ChartModel } from 'src/app/_models/chartmodel';
import { TotalsReport } from 'src/app/_models/totalsReport';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  checkoutsDataByDay: any;
  returnsDataByDay: any;
  dailyActivityLabel: any;
  dailyActivityData: any;
  monthlyActivityData: any;
  monthlyActivityLabel: any;
  checkoutsDataByMonth: any;
  returnsDataByMonth: any;
  assetTypeDistributionData: any;
  assetTypeDistributionLabel: any;
  categoryDistributionData: any;
  categoryDistributionLabel: any;

  TotalMembers: number;
  TotalItems: number;
  TotalAuthors: number;
  TotalCheckouts: number;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.getDailyActivity();
    this.getAssetTypeDistribution();
    this.getCategoryDistribution();
    this.getMonthlyActivity();
    this.getTotals();
  }

  getDailyActivity() {
    this.reportService.getCheckoutByDay().subscribe((checkouts: ChartModel) => {
      this.reportService.getReturnByDay().subscribe((returns: ChartModel) => {
        this.dailyActivityData = [
          {'data': checkouts.data.map((a: { count: any; }) => a.count), 'label': checkouts.label},
          {'data': returns.data.map((a: { count: any; }) => a.count), 'label': returns.label}];
      });
      this.dailyActivityLabel = checkouts.data.map((a: { name: any; }) => a.name);
    });
  }

  getMonthlyActivity() {
    this.reportService.getCheckoutByMonth().subscribe((checkouts: ChartModel) => {
      this.reportService.getReturnsByMonth().subscribe((returns: ChartModel) => {
        this.monthlyActivityData = [
          {'data': checkouts.data.map((a: { count: any; }) => a.count), 'label': checkouts.label},
          {'data': returns.data.map((a: { count: any; }) => a.count), 'label': returns.label}];
      });
      this.monthlyActivityLabel = checkouts.data.map((a: { name: any; }) => a.name);
    });
  }

  getAssetTypeDistribution() {
    this.reportService.getAssetDistribution().subscribe((chartModel: ChartModel) => {
      this.assetTypeDistributionData = chartModel.data.map(a => a.count);
      this.assetTypeDistributionLabel = chartModel.data.map(a => a.name);
    });
  }

  getCategoryDistribution() {
    this.reportService.getCategoryDistribution().subscribe((chartModel: ChartModel) => {
      this.categoryDistributionData = chartModel.data.map(a => a.count);
      this.categoryDistributionLabel = chartModel.data.map(a => a.name);
    });
  }

  getTotals() {
    this.reportService.getTotals().subscribe((result: TotalsReport) => {
      this.TotalAuthors = result.totalAuthors;
      this.TotalCheckouts = result.totalCheckouts;
      this.TotalItems = result.totalItems;
      this.TotalMembers = result.totalMembers;
    });
  }

}

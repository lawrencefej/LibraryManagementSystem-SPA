import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/_services/report.service';
import { ChartModel } from 'src/app/_models/chartmodel';

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
  checkoutsDataByMonth: any;
  returnsDataByMonth: any;
  assetTypeDistributionData: any;
  assetTypeDistributionLabel: any;
  categoryDistributionData: any;
  categoryDistributionLabel: any;

  TotalMembers: number = 2000;
  TotalItems: number = 10000;
  TotalAuthors: number = 2000;
  TotalCheckouts: number = 2000;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.getDailyActivity();
    this.getAssetTypeDistribution();
    this.getCategoryDistribution();
  }

  getDailyActivity() {
    this.reportService.getCheckoutByDay().subscribe((checkouts: ChartModel) => {
      this.checkoutsDataByDay = checkouts;
      this.reportService.getReturnByDay().subscribe((returns: ChartModel) => {
        this.returnsDataByDay = returns;
        this.dailyActivityData = [
          {'data': this.checkoutsDataByDay.data.map((a: { data: any; }) => a.data), 'label': this.checkoutsDataByDay.label},
          {'data': this.returnsDataByDay.data.map((a: { data: any; }) => a.data), 'label': this.returnsDataByDay.label}];
      });
      this.dailyActivityLabel = this.checkoutsDataByDay.data.map((a: { name: any; }) => a.name);
    });
  }

  getAssetTypeDistribution() {
    this.reportService.getAssetDistribution().subscribe((chartModel: ChartModel) => {
      this.assetTypeDistributionData = chartModel.data.map(a => a.data);
      this.assetTypeDistributionLabel = chartModel.data.map(a => a.name);
    });
  }

  getCategoryDistribution() {
    this.reportService.getCategoryDistribution().subscribe((chartModel: ChartModel) => {
      this.categoryDistributionData = chartModel.data.map(a => a.data);
      this.categoryDistributionLabel = chartModel.data.map(a => a.name);
    });
  }

}

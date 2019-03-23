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
  TotalMembers: number = 2000;
  TotalItems: number = 10000;
  TotalAuthors: number = 2000;
  TotalCheckouts: number = 2000;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.getDailyActivity();
  }

  getDailyActivity() {
    this.reportService.getCheckoutByDay().subscribe((checkouts: ChartModel) => {
      this.checkoutsDataByDay = checkouts;
      // this.data = this.checkoutsDataByDay.data;
      this.reportService.getReturnByDay().subscribe((returns: ChartModel) => {
        this.returnsDataByDay = returns;
        // this.data2 = this.chartData2.data;
        this.dailyActivityData = [
          {'data': this.checkoutsDataByDay.data.map(a => a.data), 'label': this.checkoutsDataByDay.label},
          {'data': this.returnsDataByDay.data.map(a => a.data), 'label': this.returnsDataByDay.label}];
      });
      this.dailyActivityLabel = this.checkoutsDataByDay.data.map(a => a.name);
      // console.log(this.dailyActivityData);
      // console.log(this.dailyActivityLabel);
    });
  }

}

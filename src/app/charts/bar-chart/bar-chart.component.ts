import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { ReportService } from 'src/app/_services/report.service';
import { ChartModel } from 'src/app/_models/chartModel';
import { Data } from '@angular/router';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: any[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  constructor(private reportService: ReportService) { }
  chartData: ChartModel;
  data: Data[];
  chartData2: ChartModel;
  data2: Data[];
  localLabel: any;
  LocalBarChartLabels: any[];

  barChartData = [
    {'data': [0], 'label': ''},
    {'data': [0], 'label': ''}
  ];

  ngOnInit() {
    this.reportService.getCheckoutByDay().subscribe((chartModel: ChartModel) => {
      this.chartData = chartModel;
      this.data = this.chartData.data;
      this.reportService.getReturnByDay().subscribe((chartModel: ChartModel) => {
        this.chartData2 = chartModel;
        this.data2 = this.chartData2.data;
        this.barChartData = [
          {'data': this.data.map(a => a.data), 'label': this.chartData.label},
          {'data': this.data2.map(a => a.data), 'label': this.chartData2.label}];
      });
      this.barChartLabels = this.data.map(a => a.name);
    });
  }

}

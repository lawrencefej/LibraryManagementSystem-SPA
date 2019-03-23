import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ReportService } from 'src/app/_services/report.service';
import { ChartModel } from 'src/app/_models/chartModel';
import { ChartData } from 'src/app/_models/chartData';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  chartData: ChartModel;
  data: ChartData[];

  constructor(private reportService: ReportService) { }
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  pieChartData: any[] = [0];
  pieChartLabels: any[] = [''];
  colors: any[] = [
    {
      backgroundColor: ['#26547c', '#ff6b6b', '#ffd166']
    }
  ];
  public pieChartLegend = true;
  pieChartType = 'pie';

  ngOnInit() {
    this.reportService.getAssetDistribution().subscribe((chartModel: ChartModel) => {
      this.chartData = chartModel;
      this.data = this.chartData.data;
      this.pieChartData = this.data.map(a => a.data);
      this.pieChartLabels = this.data.map(a => a.name);
    });
  }

}

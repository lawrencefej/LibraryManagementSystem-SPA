import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }
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
  pieChartData: number[] = [350, 450, 120];
  pieChartLabels: string[] = ['Science', 'Computer', 'Other'];
  colors: any[] = [
    {
      backgroundColor: ['#26547c', '#ff6b6b', '#ffd166']
    }
  ];
  public pieChartLegend = true;
  pieChartType = 'pie';

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';
import { ReportService } from 'src/app/_services/report.service';
import { ChartModel } from 'src/app/_models/chartModel';
import { Data } from '@angular/router';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  public lineChartLabels: any[];
  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Color[] = [
    // { // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private reportService: ReportService) { }
  chartData: ChartModel;
  data: Data[];
  chartData2: ChartModel;
  data2: Data[];
  localLabel: any;
  LocalBarChartLabels: any[];
  lineChartData = [
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
        this.lineChartData = [
          {'data': this.data.map(a => a.data), 'label': this.chartData.label},
          {'data': this.data2.map(a => a.data), 'label': this.chartData2.label}];
      });
      this.lineChartLabels = this.data.map(a => a.name);
      console.log(this.lineChartData);

    });
  }

  // events
  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

}

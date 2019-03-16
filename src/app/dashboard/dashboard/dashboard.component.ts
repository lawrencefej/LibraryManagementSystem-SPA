import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  TotalMembers: number = 2000;
  TotalItems: number = 10000;
  TotalAuthors: number = 2000;
  TotalCheckouts: number = 2000;

  constructor() { }

  ngOnInit() {
  }

}

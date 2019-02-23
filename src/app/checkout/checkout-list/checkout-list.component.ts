import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Checkout } from 'src/app/_models/checkout';

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.css']
})
export class CheckoutListComponent implements OnInit {
  checkouts: Checkout[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.checkouts = data['checkouts'];
    });
  }

}

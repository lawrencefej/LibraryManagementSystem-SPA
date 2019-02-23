import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Checkout } from 'src/app/_models/checkout';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.css']
})
export class CheckoutListComponent implements OnInit {
  checkouts: Checkout[];
  count: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.checkouts = data['checkouts'];
    });

    this.count = this.checkouts.length;
  }

}

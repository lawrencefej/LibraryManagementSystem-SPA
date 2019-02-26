import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Checkout } from 'src/app/_models/checkout';
import { CheckoutService } from 'src/app/_services/checkout.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.css']
})
export class CheckoutListComponent implements OnInit {
  checkouts: Checkout[];
  count: number;
  value = '';

  constructor(private route: ActivatedRoute, private checkoutService: CheckoutService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.checkouts = data['checkouts'];
      this.count = this.checkouts.length;
    });
  }

  searchCheckouts(value: string) {
    this.checkoutService.searchCheckouts(value).subscribe((checkouts: Checkout[]) => {
      this.checkouts = checkouts;
      this.count = this.checkouts.length;
    }, error => {
      this.alertify.error(error);
    });
  }

}

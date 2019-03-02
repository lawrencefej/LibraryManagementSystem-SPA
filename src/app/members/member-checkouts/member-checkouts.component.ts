import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { AlertifyService } from 'src/app/_services/alertify.service';
import { Checkout } from 'src/app/_models/checkout';
import { CheckoutService } from 'src/app/_services/checkout.service';
import { User } from 'src/app/_models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-checkouts',
  templateUrl: './member-checkouts.component.html',
  styleUrls: ['./member-checkouts.component.css']
})
export class MemberCheckoutsComponent implements OnInit, OnDestroy {
  @Input() member: User;
  checkouts: Checkout[];
  count: number;
  subscription: Subscription;

  constructor(private checkoutService: CheckoutService, private alertify: AlertifyService) {
    this.subscription = this.checkoutService.getNewCheckout().subscribe(checkout => {
      this.checkouts.push(checkout);
      this.count = this.checkouts.length;
    });
  }

  ngOnInit() {
    this.getCheckoutsForMember();
  }

  getCheckoutsForMember() {
    this.checkoutService.getCheckoutsForMember(this.member.id).subscribe((checkouts: Checkout[]) => {
      this.checkouts = checkouts;
      this.count = this.checkouts.length;
    }, error => {
      this.alertify.error(error);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

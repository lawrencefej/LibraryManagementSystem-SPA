import { Component, Input, OnInit } from '@angular/core';

import { AlertifyService } from 'src/app/_services/alertify.service';
import { Checkout } from 'src/app/_models/checkout';
import { CheckoutService } from 'src/app/_services/checkout.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-checkouts',
  templateUrl: './member-checkouts.component.html',
  styleUrls: ['./member-checkouts.component.css']
})
export class MemberCheckoutsComponent implements OnInit {
  @Input() member: User;
  checkouts: Checkout[];
  count: number;

  constructor(private checkoutService: CheckoutService, private alertify: AlertifyService) { }

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

}

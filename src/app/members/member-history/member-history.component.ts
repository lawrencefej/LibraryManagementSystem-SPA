import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { ReserveAsset } from 'src/app/_models/reserveAsset';
import { Checkout } from 'src/app/_models/checkout';
import { CheckoutService } from 'src/app/_services/checkout.service';

@Component({
  selector: 'app-member-history',
  templateUrl: './member-history.component.html',
  styleUrls: ['./member-history.component.css']
})
export class MemberHistoryComponent implements OnInit {
  user: User;
  reserves: ReserveAsset[];
  checkouts: Checkout[];
  test: any;

  constructor(private alertify: AlertifyService,
    private authService: AuthService, private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.loadCheckouts();
    // this.test = this.authService.decodedToken.role as Array<string>;
    //   console.log(this.test);
  }

  // loadReserves() {
  //   this.userService.getReserves(this.authService.decodedToken.nameid).subscribe((reserves: ReserveAsset[]) => {
  //     this.reserves = reserves;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

  loadCheckouts() {
    this.checkoutService.getCheckoutsForMember(this.authService.decodedToken.nameid).subscribe((checkouts: Checkout[]) => {
      this.checkouts = checkouts;
    }, error => {
      this.alertify.error(error);
    });
  }

}

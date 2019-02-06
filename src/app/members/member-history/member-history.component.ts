import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { ReserveAsset } from 'src/app/_models/reserveAsset';
import { Checkout } from 'src/app/_models/checkout';

@Component({
  selector: 'app-member-history',
  templateUrl: './member-history.component.html',
  styleUrls: ['./member-history.component.css']
})
export class MemberHistoryComponent implements OnInit {
  user: User;
  reserves: ReserveAsset[];
  checkouts: Checkout[];

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.loadReserves();
    this.loadCheckouts();
  }

  loadReserves() {
    this.userService.getReserves(this.authService.decodedToken.nameid).subscribe((reserves: ReserveAsset[]) => {
      this.reserves = reserves;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadCheckouts() {
    this.userService.getCheckout(this.authService.decodedToken.nameid).subscribe((checkouts: Checkout[]) => {
      this.checkouts = checkouts;
    }, error => {
      this.alertify.error(error);
    });
  }

}

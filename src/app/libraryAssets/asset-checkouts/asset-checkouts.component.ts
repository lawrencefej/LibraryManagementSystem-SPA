import { Component, OnInit, Input } from '@angular/core';
import { LibraryAsset } from 'src/app/_models/libraryAsset';
import { Checkout } from 'src/app/_models/checkout';
import { CheckoutService } from 'src/app/_services/checkout.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-asset-checkouts',
  templateUrl: './asset-checkouts.component.html',
  styleUrls: ['./asset-checkouts.component.css']
})
export class AssetCheckoutsComponent implements OnInit {
  @Input() asset: LibraryAsset;
  checkouts: Checkout[];
  count: number;

  constructor(private checkoutService: CheckoutService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getCheckoutsForAsset();
  }

  getCheckoutsForAsset() {
    this.checkoutService.getCheckoutsForAsset(this.asset.id).subscribe((checkouts: Checkout[]) => {
      this.checkouts = checkouts;
      this.count = this.checkouts.length;
    }, error => {
      this.alertify.error(error);
    });
  }

}

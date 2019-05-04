import { User } from './../../_models/user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AssetService } from 'src/app/_services/asset.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { LibraryAsset } from 'src/app/_models/libraryAsset';
import { CheckoutService } from 'src/app/_services/checkout.service';
import { Checkout } from 'src/app/_models/checkout';

@Component({
  selector: 'app-checkout-asset',
  templateUrl: './checkout-asset.component.html',
  styleUrls: ['./checkout-asset.component.css']
})
export class CheckoutAssetComponent implements OnInit {

  constructor(private assetService: AssetService, private alertify: AlertifyService, private checkoutService: CheckoutService) { }
  @Input() userId: number;
  @Input() fees: number;
  @Input() member: User;
  @Output() checkout = new EventEmitter<Checkout>();
  assets: LibraryAsset[];
  value = '';
  count: number;
  newCheckout: any = {};

  ngOnInit() {
  }

  searchAssets(value: string) {
    if (value === '') {
      this.assets = [];
      return;
    }

    this.value = value;
    this.assetService.searchAsset(value).subscribe((assets: LibraryAsset[]) => {
      this.assets = assets;
      this.count = this.assets.length;
      console.log(this.count);
    }, error => {
      this.alertify.error(error);
    });
  }

  CheckoutAsset(id: number) {
    this.newCheckout.libraryAssetId = id;
    this.newCheckout.userId = this.userId;
    this.checkoutService.checkoutAsset(this.newCheckout).subscribe((checkout: Checkout) => {
      this.sendCheckout(checkout);
      this.alertify.success('checked out successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  sendCheckout(checkout: Checkout): void {
    this.checkoutService.sendNewCheckout(checkout);
  }

  hasFees() {
    if (this.fees > 0) {
      return true;
    }

    return false;
  }

}

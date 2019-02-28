import { Component, OnInit, Input } from '@angular/core';
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
  assets: LibraryAsset[];
  count: number;
  value = '';
  newCheckout: any = {};

  ngOnInit() {
  }

  searchAssets(value: string) {
    this.value = value;
    this.assetService.searchAsset(value).subscribe((assets: LibraryAsset[]) => {
      this.assets = assets;
      this.count = this.assets.length;
    }, error => {
      this.alertify.error(error);
    });
  }

  CheckoutAsset(id: number) {
    this.newCheckout.libraryAssetId = id;
    this.newCheckout.userId = this.userId;
    this.checkoutService.checkoutAsset(this.newCheckout).subscribe(next => {
      this.alertify.success('checked out successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  isAvailable(count: number) {
    if (count > 0) {
      return true;
    }
    return false;
  }

  selectTab(tabId: number) {
    // this.assetTabs.tabs[tabId].active = true;
  }
  // TODO fix refresh

}

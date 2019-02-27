import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/_services/asset.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { LibraryAsset } from 'src/app/_models/libraryAsset';

@Component({
  selector: 'app-checkout-asset',
  templateUrl: './checkout-asset.component.html',
  styleUrls: ['./checkout-asset.component.css']
})
export class CheckoutAssetComponent implements OnInit {

  constructor(private assetService: AssetService, private alertify: AlertifyService) { }
  assets: LibraryAsset[];
  count: number;
  value = '';

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

}

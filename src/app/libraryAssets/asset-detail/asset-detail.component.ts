import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/_services/asset.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { LibraryAsset } from 'src/app/_models/libraryAsset';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit {
  asset: LibraryAsset;

  constructor(private assetService: AssetService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.assetService.getAsset(+this.route.snapshot.params['id']).subscribe((asset: LibraryAsset) => {
      this.asset = asset;
    }, error => {
      this.alertify.error(error);
    });
  }

}

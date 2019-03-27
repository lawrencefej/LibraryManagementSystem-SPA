import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { AlertifyService } from 'src/app/_services/alertify.service';
import { AssetService } from 'src/app/_services/asset.service';
import { AuthService } from 'src/app/_services/auth.service';
import { LibraryAsset } from 'src/app/_models/libraryAsset';
import { ReserveAsset } from 'src/app/_models/reserveAsset';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AddAssetComponent } from '../add-asset/add-asset.component';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit {
  @Input() asset: LibraryAsset;
  reserve: ReserveAsset;
  bsModalRef: BsModalRef;

  constructor(private assetService: AssetService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute, private modalService: BsModalService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.asset = data['asset'];
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  updateAsset(asset: LibraryAsset) {
    this.assetService.updateAsset(this.authService.decodedToken.nameid, asset).subscribe(() => {
      this.alertify.success('Updated Successful');
      this.asset = asset;
    }, error => {
      this.alertify.error(error);
    });
  }

  editAssetModal(asset: LibraryAsset) {
    const initialState = {
      asset
    };
    this.bsModalRef = this.modalService.show(AddAssetComponent, {initialState});
    this.bsModalRef.content.updatedAsset.subscribe((value: LibraryAsset) => {
      this.updateAsset(value);
    });
  }

}

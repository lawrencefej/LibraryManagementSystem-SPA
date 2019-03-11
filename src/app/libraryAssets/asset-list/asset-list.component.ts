import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AssetService } from 'src/app/_services/asset.service';
import { LibraryAsset } from 'src/app/_models/libraryAsset';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AddAssetComponent } from '../add-asset/add-asset.component';
@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  assets: LibraryAsset[];
  count: number;
  value = '';
  bsModalRef: BsModalRef;

  constructor(private assetService: AssetService,
    private alertify: AlertifyService,
    private route: ActivatedRoute, private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.assets = data['assets'];
      this.count = this.assets.length;
    });
  }

  searchAssets(value: string) {
    this.assetService.searchAsset(value).subscribe((assets: LibraryAsset[]) => {
      this.assets = assets;
      this.count = this.assets.length;
    }, error => {
      this.alertify.error(error);
    });
  }

  addAssetModal() {
    this.bsModalRef = this.modalService.show(AddAssetComponent);
    this.bsModalRef.content.addedAsset.subscribe((value) => {
      this.addAsset(value);
    });
  }

  addAsset(asset: LibraryAsset) {
    this.assetService.addAuthor(asset).subscribe((libraryAsset: LibraryAsset) => {
      this.alertify.success('Item Added Successfully');
      this.assets.unshift(libraryAsset);
      asset = libraryAsset;
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/catalog', asset.id]);
    });
  }

}

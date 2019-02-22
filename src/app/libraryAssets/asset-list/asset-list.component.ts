import { Component, OnInit } from '@angular/core';
import { LibraryAsset } from 'src/app/_models/libraryAsset';
import { AssetService } from 'src/app/_services/asset.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  assets: LibraryAsset[];

  constructor(private assetService: AssetService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.assets = data['assets'];
    });
  }

  // loadAssets() {
  //   this.assetService.getAssets().subscribe((assets: LibraryAsset[]) => {
  //     this.assets = assets;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}

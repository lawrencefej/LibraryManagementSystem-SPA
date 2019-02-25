import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AssetService } from 'src/app/_services/asset.service';
import { LibraryAsset } from 'src/app/_models/libraryAsset';
@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  assets: LibraryAsset[];
  // searchText$ = new Subject<string>();
  search = '';
  count: number;
  value = '';

  constructor(private assetService: AssetService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.assets = data['assets'];
    });
  }

  searchAssets(value: string) {
    // this.search = value;
    this.assetService.searchAsset(value).subscribe((assets: LibraryAsset[]) => {
      this.assets = assets;
      this.count = this.assets.length;
    }, error => {
      this.alertify.error(error);
    });
  }

}

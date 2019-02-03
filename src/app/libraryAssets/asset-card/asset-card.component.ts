import { Component, OnInit, Input } from '@angular/core';
import { LibraryAsset } from 'src/app/_models/libraryAsset';
import { AssetService } from 'src/app/_services/asset.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.css']
})
export class AssetCardComponent implements OnInit {
  @Input() asset: LibraryAsset;

  constructor(private assetService: AssetService,
    private alertify: AlertifyService) { }

  ngOnInit() {
  }


}

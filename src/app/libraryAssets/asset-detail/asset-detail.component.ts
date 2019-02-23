import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { AlertifyService } from 'src/app/_services/alertify.service';
import { AssetService } from 'src/app/_services/asset.service';
import { AuthService } from 'src/app/_services/auth.service';
import { LibraryAsset } from 'src/app/_models/libraryAsset';
import { ReserveAsset } from 'src/app/_models/reserveAsset';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit {
  @Input() asset: LibraryAsset;
  reserve: ReserveAsset;

  constructor(private assetService: AssetService,
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.asset = data['asset'];
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  reserveAsset(assetId: number) {
    this.userService.reserveAsset(this.authService.decodedToken.nameid, assetId).subscribe(data => {
      this.alertify.success(this.asset.title + 'was reserved successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/_services/asset.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryAsset } from 'src/app/_models/libraryAsset';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { ReserveAsset } from 'src/app/_models/reserveAsset';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit {
  asset: LibraryAsset;
  // user: User;
  reserve: ReserveAsset;

  constructor(private assetService: AssetService,
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadAsset();
  }

  loadAsset() {
    this.assetService.getAsset(+this.route.snapshot.params['id']).subscribe((asset: LibraryAsset) => {
      this.asset = asset;
    }, error => {
      this.alertify.error(error);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  reserveAsset() {
    this.reserve.libraryAssetId = this.asset.id;
    this.userService.reserveAsset(this.authService.decodedToken.nameid, this.reserve).subscribe(next => {
      this.alertify.success('Reserve was successful');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/currentitems']);
    });
  }

}

import { PhotoService } from './../../_services/photo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AlertifyService } from 'src/app/_services/alertify.service';
import { AssetService } from 'src/app/_services/asset.service';
import { AuthService } from 'src/app/_services/auth.service';
import { LibraryAsset } from 'src/app/_models/libraryAsset';
import { ReserveAsset } from 'src/app/_models/reserveAsset';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AddAssetComponent } from '../add-asset/add-asset.component';
import { Photo } from 'src/app/_models/photo';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit {
  @Input() asset: LibraryAsset;
  @ViewChild('fileInput') myInputVariable: ElementRef;
  reserve: ReserveAsset;
  bsModalRef: BsModalRef;
  selectedFile: File = null;
  model: any = {
    file: null,
    userId: null
  };

  constructor(
    private assetService: AssetService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private photoService: PhotoService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.asset = data['asset'];
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  updateAsset(asset: LibraryAsset) {
    this.assetService.updateAsset(this.authService.decodedToken.nameid, asset).subscribe(
      () => {
        this.alertify.success('Updated Successful');
        this.asset = asset;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  editAssetModal(asset: LibraryAsset) {
    const initialState = {
      asset
    };
    this.bsModalRef = this.modalService.show(AddAssetComponent, { initialState });
    this.bsModalRef.content.updatedAsset.subscribe((value: LibraryAsset) => {
      this.updateAsset(value);
    });
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fd = new FormData();
      fd.append('libraryAssetId', this.asset.id.toString());
      fd.append('file', file);
      this.photoService.changeAssetPhoto(fd).subscribe(
        (res: Photo) => {
          this.asset.photoUrl = res.url;
          this.alertify.success('Photo changed successfully');
        },
        error => {
          this.alertify.error(error);
        }
      );
    }
    this.myInputVariable.nativeElement.value = '';
  }
}

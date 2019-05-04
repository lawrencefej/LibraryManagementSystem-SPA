import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AssetService } from 'src/app/_services/asset.service';
import { LibraryAsset } from 'src/app/_models/libraryAsset';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AddAssetComponent } from '../add-asset/add-asset.component';
import { AuthService } from 'src/app/_services/auth.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  assets: LibraryAsset[];
  itemsPerPage = [{value: '5', display: 'Show 5 items Per Page'},
                  {value: '10', display: 'Show 10 items Per Page'}];
  selectedItemPerPage: any;
  bsModalRef: BsModalRef;
  pagination: Pagination;
  count: number;

  constructor(private assetService: AssetService,
    private alertify: AlertifyService,
    private route: ActivatedRoute, private modalService: BsModalService,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.assets = data['assets'].result;
      this.pagination = data['assets'].pagination;
      this.selectedItemPerPage = this.pagination.itemsPerPage;
      this.count = this.pagination.totalItems;
    });
  }

  searchAssets(value: string) {
    this.assetService.searchAsset(value).subscribe((assets: LibraryAsset[]) => {
      this.assets = assets;
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

  addAssetModal() {
    this.bsModalRef = this.modalService.show(AddAssetComponent);
    this.bsModalRef.content.addedAsset.subscribe((value: LibraryAsset) => {
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

  updateAsset(asset: LibraryAsset) {
    this.assetService.updateAsset(this.authService.decodedToken.nameid, asset).subscribe(() => {
      this.alertify.success('Updated Successful');
      const item = this.assets.find(a => a.id === asset.id);
      const index = this.assets.indexOf(item);
      this.assets[index] = asset;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }

  onPageSizeChange(value: any): void {
    this.loadData();
  }

  deleteAsset(id) {
    // this.alertify.confirm('are you sure you want to delete this member');
    this.alertify.success('Item Deleted');
  }

  getAsset(id: any) {
    this.assetService.getAsset(id).subscribe((asset: LibraryAsset) => {
      this.editAssetModal(asset);
    }, error => {
      this.alertify.error(error);
    });
  }

  loadData() {
    this.pagination.itemsPerPage = this.selectedItemPerPage;
    this.assetService
      .getPaginatedAssets(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (res: PaginatedResult<LibraryAsset[]>) => {
        this.assets = res.result;
        this.pagination = res.pagination;
        this.count = res.pagination.totalItems;

    }, error => {
      this.alertify.error(error);
    });
  }
}

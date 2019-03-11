import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef, TypeaheadMatch } from 'ngx-bootstrap';
import { Author } from 'src/app/_models/author';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from 'src/app/_services/author.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AssetTypeService } from 'src/app/_services/asset-type.service';
import { CategoryService } from 'src/app/_services/category.service';
import { AssetType } from 'src/app/_models/assetType';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {
  @Output() addedAsset = new EventEmitter();
  author: Author;
  categories: Category[];
  assetTypes: AssetType[];
  selectedValue: string;
  selectedOption: any;
  model: any = {
    firstName: '',
    categoryId: 0,
    assetTypeId: 0
  };
  authors: Author[];


  constructor(public bsModalRef: BsModalRef, private route: ActivatedRoute,
    private authorService: AuthorService, private alertify: AlertifyService,
    private assetTypeService: AssetTypeService, private categoryService: CategoryService) { }

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.authors = data['authors'];
    // });
    this.getAuthors();
    this.getCategories();
    this.getAssetTypes();
  }

  addAsset() {
    this.model.authorId = this.selectedOption.id;
    this.addedAsset.emit(this.model);
    this.bsModalRef.hide();
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
  }

  search($event) {
    let value = $event.target.value;
    this.authorService.searchAuthors(value).subscribe((authors: Author[]) => {
      this.authors = authors;
    }, error => {
      this.alertify.error(error);
    });
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe((authors: Author[]) => {
      this.authors = authors;
    });
    // TODO add error
  }

  getAssetTypes() {
    this.assetTypeService.getCategories().subscribe((assetTypes: AssetType[]) => {
      this.assetTypes = assetTypes;
    });
    // TODO add error
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
    // TODO add error
  }

  filterCategory(value: any) {
    this.categories.filter((item) => item.id === value);
    this.model.categoryId = value;
  }

  filterAssetType(value: any) {
    this.assetTypes.filter((item) => item.id === value);
    this.model.assetTypeId = value;
  }

}

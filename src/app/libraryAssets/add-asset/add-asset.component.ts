import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef, TypeaheadMatch } from 'ngx-bootstrap';
import { Author } from 'src/app/_models/author';
import { AuthorService } from 'src/app/_services/author.service';
import { AssetTypeService } from 'src/app/_services/asset-type.service';
import { CategoryService } from 'src/app/_services/category.service';
import { AssetType } from 'src/app/_models/assetType';
import { Category } from 'src/app/_models/category';
import { LibraryAsset } from 'src/app/_models/libraryAsset';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {
  @Output() addedAsset = new EventEmitter();
  @Output() updatedAsset = new EventEmitter();

  author: Author;
  categories: Category[];
  assetType: AssetType;
  assetTypes: AssetType[];
  selectedValue: string;
  selectedOption: any;
  model: any = {
    categoryId: 0,
    assetTypeId: 0
  };
  authors: Author[];
  selectedCategory: any;
  selectedAssetType: any;
  asset: LibraryAsset;
  button = 'Save';


  constructor(public bsModalRef: BsModalRef, private authorService: AuthorService,
    private assetTypeService: AssetTypeService, private categoryService: CategoryService) { }

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.authors = data['authors'];
    // });
    this.getAuthors();
    this.getCategories();
    this.getAssetTypes();
    this.isUpdate();
  }

  addAsset() {
    if (this.button === 'Update') {
      this.updatedAsset.emit(this.model);
      this.bsModalRef.hide();
    } else {
      this.addedAsset.emit(this.model);
      this.bsModalRef.hide();
    }
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.model.authorId = this.selectedOption.id;
  }

  // search($event) {
  //   let value = $event.target.value;
  //   this.authorService.searchAuthors(value).subscribe((authors: Author[]) => {
  //     this.authors = authors;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

  getAuthors() {
    this.authorService.getAuthors().subscribe((authors: Author[]) => {
      this.authors = authors;
    });
    // TODO add error
  }

  isUpdate() {
    if (this.asset !== undefined) {
      this.model = this.asset;
      this.selectedValue = this.asset.authorName;
      this.model.authorId = this.asset.authorId;
      this.button = 'Update';
      return true;
    }
  }

  getAssetTypes() {
    this.assetTypeService.getCategories().subscribe((assetTypes: AssetType[]) => {
      this.assetTypes = assetTypes;
      if (this.asset !== undefined) {
        this.selectedAssetType = assetTypes.find(a => a.name === this.asset.assetType);
        this.model.assetTypeId = this.selectedAssetType.id;
      }
    });
    // TODO add error
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      if (this.asset !== undefined) {
        this.selectedCategory = categories.find(a => a.name === this.asset.category);
        this.model.categoryId = this.selectedCategory.id;
      }
    });
    // TODO add error
  }

  onItemChange(value: AssetType) {
    this.model.assetTypeId = value.id;
  }

  onCategoryChange(value: any) {
    this.model.categoryId = value.id;
  }

  isBook() {
    if (this.selectedAssetType === undefined) {
      return false;
    }
    if (this.selectedAssetType.name === 'Book') {
      return true;
    }
  }

}

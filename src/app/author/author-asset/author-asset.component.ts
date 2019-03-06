import { Component, OnInit, Input } from '@angular/core';
import { Author } from 'src/app/_models/author';
import { LibraryAsset } from 'src/app/_models/libraryAsset';
import { AuthorService } from 'src/app/_services/author.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-author-asset',
  templateUrl: './author-asset.component.html',
  styleUrls: ['./author-asset.component.css']
})
export class AuthorAssetComponent implements OnInit {
  // @Input() author: Author;
  author: Author;
  assets: LibraryAsset[];
  filteredAssets: LibraryAsset[];
  count: number;
  value = '';

  constructor(private authorService: AuthorService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.author = data['author'];
    });
    this.getAssets();
  }

  getAssets() {
    this.authorService.getAssetForAuthor(this.author.id).subscribe((assets: LibraryAsset[]) => {
      this.assets = assets;
      this.count = this.assets.length;
    }, error => {
      this.alertify.error(error)
    });
  }
  searchAsset(value: string) {
    // if (value === '') {
    //   return this.getAssets();
    // }
    // this.filteredAssets = this.assets;
    // for (let asset of this.assets) {
    //   // this.assets = (this.filteredAssets.filter(a => a.title === value));
    //   if (!asset.title.includes(value)) {
    //     this.assets.splice(this.assets.findIndex(p => p.id === asset.id));
    //   }
    //   return this.assets;
    // }
  }

}

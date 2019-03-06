import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/_models/author';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/_services/author.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  authors: Author[];
  count: number;
  value = '';

  constructor(private route: ActivatedRoute, private authorService: AuthorService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.authors = data['authors'];
      this.count = this.authors.length;
    });
  }

  searchMembers(value: string) {
    this.authorService.searchAuthors(value).subscribe((authors: Author[]) => {
      this.authors = authors;
      this.count = this.authors.length;
    }, error => {
      this.alertify.error(error);
    });
  }

}

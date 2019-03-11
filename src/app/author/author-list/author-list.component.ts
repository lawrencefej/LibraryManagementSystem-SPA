import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/_models/author';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/_services/author.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AddAuthorComponent } from '../add-author/add-author.component';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  authors: Author[];
  count: number;
  value = '';
  bsModalRef: BsModalRef;

  constructor(private route: ActivatedRoute, private authorService: AuthorService,
     private alertify: AlertifyService, private modalService: BsModalService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.authors = data['authors'];
      this.count = this.authors.length;
    });
  }

  searchAuthors(value: string) {
    this.authorService.searchAuthors(value).subscribe((authors: Author[]) => {
      this.authors = authors;
      this.count = this.authors.length;
    }, error => {
      this.alertify.error(error);
    });
  }

  addAuthorModal() {
    this.bsModalRef = this.modalService.show(AddAuthorComponent);
    this.bsModalRef.content.addedAuthor.subscribe((value) => {
      this.addAuthor(value);
    });
  }

  addAuthor(author: Author) {
    this.authorService.addAuthor(author).subscribe((author: Author) => {
      this.alertify.success('Author Added Successfully');
      this.authors.unshift(author);
      this.count = this.authors.length;
    }, error => {
      this.alertify.error(error);
    });
  }

}

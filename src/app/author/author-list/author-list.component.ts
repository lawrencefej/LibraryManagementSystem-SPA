import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/_models/author';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/_services/author.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AddAuthorComponent } from '../add-author/add-author.component';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

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
  pagination: Pagination;

  constructor(private route: ActivatedRoute, private authorService: AuthorService,
     private alertify: AlertifyService, private modalService: BsModalService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.authors = data['authors'].result;
      this.pagination = data['authors'].pagination;
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

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService
      .getPaginatedAuthors(
        this.pagination.currentPage,
        this.pagination.itemsPerPage
      )
      .subscribe(
        (res: PaginatedResult<Author[]>) => {
          this.authors = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

}

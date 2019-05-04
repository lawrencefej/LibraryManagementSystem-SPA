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
  value = '';
  bsModalRef: BsModalRef;
  pagination: Pagination;
  itemsPerPage = [
    { value: '5', display: 'Show 5 items Per Page' },
    { value: '10', display: 'Show 10 items Per Page' }
  ];
  selectedItemPerPage: any;
  count: number;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private alertify: AlertifyService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.authors = data['authors'].result;
      this.pagination = data['authors'].pagination;
      this.selectedItemPerPage = this.pagination.itemsPerPage;
      this.count = this.pagination.totalItems;
    });
  }

  searchAuthors(value: string) {
    this.authorService.searchAuthors(value).subscribe(
      (authors: Author[]) => {
        this.authors = authors;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  addAuthorModal() {
    this.bsModalRef = this.modalService.show(AddAuthorComponent);
    this.bsModalRef.content.addedAuthor.subscribe(value => {
      this.addAuthor(value);
    });
  }

  addAuthor(author: Author) {
    this.authorService.addAuthor(author).subscribe(
      (value: Author) => {
        this.alertify.success('Author Added Successfully');
        this.authors.unshift(value);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }

  loadData() {
    this.pagination.itemsPerPage = this.selectedItemPerPage;
    this.authorService
      .getPaginatedAuthors(this.pagination.currentPage, this.pagination.itemsPerPage)
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

  onPageSizeChange(value: any): void {
    this.loadData();
  }
}

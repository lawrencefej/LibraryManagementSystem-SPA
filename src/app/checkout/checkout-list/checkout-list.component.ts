import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Checkout } from 'src/app/_models/checkout';
import { CheckoutService } from 'src/app/_services/checkout.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.css']
})
export class CheckoutListComponent implements OnInit {
  checkouts: Checkout[];
  value = '';
  pagination: Pagination;
  itemsPerPage = [
    { value: '5', display: 'Show 5 items Per Page' },
    { value: '10', display: 'Show 10 items Per Page' }
  ];
  selectedItemPerPage: any;

  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.checkouts = data['checkouts'].result;
      this.pagination = data['checkouts'].pagination;
      this.selectedItemPerPage = this.pagination.itemsPerPage;
    });
  }

  searchCheckouts(value: string) {
    this.checkoutService.searchCheckouts(value).subscribe(
      (checkouts: Checkout[]) => {
        this.checkouts = checkouts;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  newCheckout() {
    this.router.navigate(['/members']);
    this.alertify.message('Select a member');
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }

  loadData() {
    this.pagination.itemsPerPage = this.selectedItemPerPage;
    this.checkoutService
      .getPaginatedAuthors(
        this.pagination.currentPage,
        this.pagination.itemsPerPage
      )
      .subscribe(
        (res: PaginatedResult<Checkout[]>) => {
          this.checkouts = res.result;
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

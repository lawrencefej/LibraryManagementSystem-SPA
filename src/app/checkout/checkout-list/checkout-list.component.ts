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
  count: number;
  value = '';
  pagination: Pagination;


  constructor(private route: ActivatedRoute, private checkoutService: CheckoutService,
     private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.checkouts = data['checkouts'].result;
      this.pagination = data['checkouts'].pagination;
      this.count = this.checkouts.length;
    });
  }

  searchCheckouts(value: string) {
    this.checkoutService.searchCheckouts(value).subscribe((checkouts: Checkout[]) => {
      this.checkouts = checkouts;
      this.count = this.checkouts.length;
    }, error => {
      this.alertify.error(error);
    });
  }

  newCheckout() {
    this.router.navigate(['/members']);
    this.alertify.message('Select a member');
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadCheckouts();
  }

  loadCheckouts() {
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

}

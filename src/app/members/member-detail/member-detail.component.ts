import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { TabsetComponent } from 'ngx-bootstrap';
import { Checkout } from 'src/app/_models/checkout';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @Input() member: User;
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  show = false;
  checkout: Checkout;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.member = data['member'];
    });

    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });
  }

  hasFees() {
    if (this.member.fees > 0) {
      return true;
    }

    return false;
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  isVisible() {
    return this.show;
  }

  getNewCheckout(checkout: Checkout) {
    this.checkout = checkout;
  }

}

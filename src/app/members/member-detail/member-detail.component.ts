import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @Input() member: User;
  @ViewChild('assetTabs') assetTabs: TabsetComponent;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.member = data['member'];
    });
  }

  hasFees() {
    if (this.member.fees > 0) {
      return true;
    }

    return false;
  }

  selectTab(tabId: number) {
    this.assetTabs.tabs[tabId].active = true;
  }

}

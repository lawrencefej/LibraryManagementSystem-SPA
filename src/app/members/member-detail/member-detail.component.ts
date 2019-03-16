import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { TabsetComponent, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Checkout } from 'src/app/_models/checkout';
import { MemberEditComponent } from '../member-edit/member-edit.component';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

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
  bsModalRef: BsModalRef;

  constructor(private route: ActivatedRoute, private modalService: BsModalService,
    private userService: UserService, private authService: AuthService, private alertify: AlertifyService) { }

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

  updateUser(member: User) {
    this.userService.updateUser(this.authService.decodedToken.nameid, member).subscribe(next => {
      this.alertify.success('Member Updated Successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  editUserModal(member: User) {
    const initialState = {
      member
    };
    this.bsModalRef = this.modalService.show(MemberEditComponent, {initialState});
    this.bsModalRef.content.updateSelectedMember.subscribe((value) => {
      this.updateUser(value);
    });
  }

}

import { Photo } from './../../_models/photo';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

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
  @ViewChild('fileInput') myInputVariable: ElementRef;
  show = false;
  checkout: Checkout;
  bsModalRef: BsModalRef;
  selectedFile: File = null;
  model: any = {
    file: null,
    userId: null
  };

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

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fd = new FormData;
      fd.append('userId', this.member.id.toString());
      fd.append('file', file);
      this.userService.changeMemberPhoto(fd).subscribe((res: Photo) => {
        this.member.photoUrl = res.url;
        this.alertify.success('Photo changed successfully');
      }, error => {
        this.alertify.error(error);
      });
    }
    this.myInputVariable.nativeElement.value = '';
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @Output() updateSelectedMember = new EventEmitter();
  member: User;

  constructor(public bsModalRef: BsModalRef, private userService: UserService,
    private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.member).subscribe(next => {
      this.alertify.success('Member Updated Successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  updateMember() {
    this.updateSelectedMember.emit(this.member);
    this.bsModalRef.hide();
  }

}

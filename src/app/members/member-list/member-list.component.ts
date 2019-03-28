import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MemberEditComponent } from '../member-edit/member-edit.component';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: User[];
  member: User;
  count: number;
  value = '';
  bsModalRef: BsModalRef;


  constructor(private route: ActivatedRoute, private userService: UserService,
     private alertify: AlertifyService, private modalService: BsModalService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.members = data['members'];
      this.count = this.members.length;
    });
  }

  searchMembers(value: string) {
    this.userService.searchMembers(value).subscribe((members: User[]) => {
      this.members = members;
      this.count = this.members.length;
    }, error => {
      this.alertify.error(error);
    });
  }

  editUserModal(member: User) {
    const initialState = {
      member
    };
    this.bsModalRef = this.modalService.show(MemberEditComponent, {initialState});
    this.bsModalRef.content.updatedMember.subscribe((value: User) => {
      this.updateUser(value);
    });
  }

  addMemberModal() {
    this.bsModalRef = this.modalService.show(MemberEditComponent);
    this.bsModalRef.content.addedMember.subscribe((value: User) => {
      this.addMember(value);
    });
  }

  addMember(value: User) {
    this.userService.AddMember(value).subscribe((member: User) => {
      this.alertify.success('Member Added Successfully');
      this.members.unshift(member);
      // value = member;
      this.router.navigate(['/members/', member.id]);
    }, error => {
      this.alertify.error(error);
    });
    // , () => {
    //   this.router.navigate(['/members/', value.id]);
    // });
  }

  updateUser(member: User) {
    this.userService.updateUser(this.authService.decodedToken.nameid, member).subscribe(next => {
      this.alertify.success('Member Updated Successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteMember(id) {
    // this.alertify.confirm('are you sure you want to delete this member');
    this.alertify.success('Member Deleted');
  }

  getMember(id) {
    this.userService.getUser(id).subscribe((member: User) => {
      this.editUserModal(member);
    }, error => {
      this.alertify.error(error);
    });
  }

}

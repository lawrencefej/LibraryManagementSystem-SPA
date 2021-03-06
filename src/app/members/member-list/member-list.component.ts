import { MemberService } from './../../_services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Component, OnInit } from '@angular/core';

import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { MemberEditComponent } from '../member-edit/member-edit.component';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: User[];
  member: User;
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
    private userService: UserService,
    private memberService: MemberService,
    private alertify: AlertifyService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.members = data['members'].result;
      this.pagination = data['members'].pagination;
      this.selectedItemPerPage = this.pagination.itemsPerPage;
      this.count = this.pagination.totalItems;
    });
  }

  searchMembers(value: string) {
    this.userService.searchMembers(value).subscribe(
      (members: User[]) => {
        this.members = members;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  editUserModal(member: User) {
    const initialState = {
      member
    };
    this.bsModalRef = this.modalService.show(MemberEditComponent, {
      initialState
    });
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
    this.memberService.AddMember(value).subscribe(
      (member: User) => {
        this.alertify.success('Member Added Successfully');
        this.members.unshift(member);
        this.router.navigate(['/members/', member.id]);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  updateUser(member: User) {
    this.memberService.updateMember(member).subscribe(
      next => {
        this.alertify.success('Member Updated Successfully');
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  deleteMember(id: number) {
    this.alertify.confirm( 'Are you sure you want to delete this member?', () => {
      this.memberService.deleteMember(id).subscribe(() => {
        this.members.splice(this.members.findIndex(u => u.id === id), 1);
        this.alertify.success('member was deleted successfully');
      }, error => {
        this.alertify.error(error);
        });
      });
  }

  getMember(id: any) {
    this.memberService.getMember(id).subscribe(
      (member: User) => {
        this.editUserModal(member);
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
    this.memberService
      .getPaginatedMembers(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.members = res.result;
          this.pagination = res.pagination;
          this.count = res.pagination.totalItems;
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

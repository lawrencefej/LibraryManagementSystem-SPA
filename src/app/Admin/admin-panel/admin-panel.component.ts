import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AdminService } from 'src/app/_services/admin.service';
import { AddAdminComponent } from '../add-admin/add-admin.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users: User[];
  count: number;
  bsModalRef: BsModalRef;

  constructor(private adminService: AdminService, private alertify: AlertifyService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getAdmins().subscribe((users => {
      this.users = users;
      this.count = this.users.length;
      console.log(this.users);
    }), error => {
      this.alertify.error(error);
    });
  }

  editRolesModal(user: User) {
    const initialState = {
      user
    };

    this.bsModalRef = this.modalService.show(AddAdminComponent, {initialState});
    this.bsModalRef.content.updatedUser.subscribe((value: User) => {
      this.updatedUser(value);
    });
  }
  updatedUser(value: User) {
    this.adminService.UpdateUser(value).subscribe(() => {
      this.alertify.success('User updated successfully');
      const user = this.users.find(a => a.id === value.id);
      const index = this.users.indexOf(user);
      this.users[index] = user;
    }, error => {
      this.alertify.error(error);
    });
  }

  addUserModal() {
    this.bsModalRef = this.modalService.show(AddAdminComponent);
    this.bsModalRef.content.addedUser.subscribe((value: User) => {
      this.addUser(value);
    });
  }
  addUser(user: any) {
    user.callbackurl = 'http://localhost:4200/resetpassword';
    this.adminService.AddUser(user).subscribe((value: User) => {
      this.alertify.success('User added Successfully');
      this.users.unshift(value);
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteUser(id: number) {

  }

}

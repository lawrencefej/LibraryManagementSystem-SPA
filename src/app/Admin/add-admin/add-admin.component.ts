import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { User } from 'src/app/_models/user';
import { Role } from 'src/app/_models/role';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  @Output() updatedUser = new EventEmitter();
  @Output() addedUser = new EventEmitter();

  user: User;
  roles: Role[];
  model: any = {};
  button = 'Save';
  selectedRole: any;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.getRoles();
    this.isUpdate();
  }

  isUpdate() {
    if (this.user !== undefined) {
      this.model = this.user;
      this.button = 'Update';
      return true;
    }
  }

  outputMember() {
    if (this.button === 'Update') {
      // this.updatedUser.emit(this.model);
      // this.bsModalRef.hide();
      console.log(this.model);
    } else {
      this.addedUser.emit(this.model);
      this.bsModalRef.hide();
      console.log(this.model);
    }
  }

  getRoles() {
    this.roles = [
      {id: 1, name: 'Librarian'},
      {id: 2, name: 'Admin'}
    ];

    if (this.user !== undefined) {
      this.selectedRole = this.roles.find(r => r.name === this.user.role);
    }
    console.log(this.user);
    console.log(this.selectedRole);
  }

  onRoleChange(value: any) {
    this.model.role = value.name;
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  // @Output() updateSelectedMember = new EventEmitter();
  @Output() updatedMember = new EventEmitter();
  @Output() addedMember = new EventEmitter();

  member: User;
  model: any = {};
  button = 'Save';

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.isUpdate();
  }

  // updateMember() {
  //   this.updateSelectedMember.emit(this.member);
  //   this.bsModalRef.hide();
  // }

  outputMember() {
    if (this.button === 'Update') {
      this.updatedMember.emit(this.model);
      this.bsModalRef.hide();
    } else {
      this.addedMember.emit(this.model);
      this.bsModalRef.hide();
      console.log(this.model);
    }
  }

  isUpdate() {
    if (this.member !== undefined) {
      this.model = this.member;
      // this.selectedValue = this.asset.authorName;
      // this.model.authorId = this.asset.authorId;
      this.button = 'Update';
      return true;
    }
  }

}

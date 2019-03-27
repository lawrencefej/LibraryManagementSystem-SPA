import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @Output() updateSelectedMember = new EventEmitter();
  member: User;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  updateMember() {
    this.updateSelectedMember.emit(this.member);
    this.bsModalRef.hide();
  }

}

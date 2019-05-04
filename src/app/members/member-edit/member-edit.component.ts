import { UserService } from './../../_services/user.service';
import { State } from './../../_models/state';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef, TypeaheadMatch } from 'ngx-bootstrap';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @Output() updatedMember = new EventEmitter();
  @Output() addedMember = new EventEmitter();

  member: User;
  states: State[];
  model: any = {};
  button = 'Save';
  selectedState: any;
  state: State;

  constructor(public bsModalRef: BsModalRef, private userService: UserService) { }

  ngOnInit() {
    this.isUpdate();
    this.states = this.userService.getStates();
    console.log(this.states);
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedState = event.item;
    this.model.State = this.selectedState.name;
    console.log(this.state);
  }

  outputMember() {
    if (this.button === 'Update') {
      this.updatedMember.emit(this.model);
      this.bsModalRef.hide();
    } else {
      this.addedMember.emit(this.model);
      this.bsModalRef.hide();
    }
  }

  isUpdate() {
    if (this.member !== undefined) {
      this.model = this.member;
      this.button = 'Update';
      return true;
    }
  }

}

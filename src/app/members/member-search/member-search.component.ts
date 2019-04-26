import { Component, OnInit } from '@angular/core';

import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {
  formModel = {
    cardNumber: null
  };
  model = {
    id: null,
    firstName: null,
    lastName: null,
    email: null
  };

  constructor(private userService: UserService, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.model.id = 0;
    this.model.firstName = '';
    this.model.lastName = '';
  }

  searchMember() {
    this.userService.getMemberByCardNumber(this.formModel.cardNumber).subscribe((member: User) => {
      if (member != null) {
        this.model = member;
        this.formModel.cardNumber = '';
        return;
      }
      this.alertify.error('This card does not exist');
    }, error => {
      this.alertify.error(error);
    });
  }

  selectMember() {
    this.router.navigate(['/members/', this.model.id]);
  }

}

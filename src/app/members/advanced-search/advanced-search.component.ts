import { MemberService } from './../../_services/member.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { ODataFilterBuilder } from 'odata-filter-builder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {
  formModel = {email: null, firstName: null, lastName: null};
  members: User[];
  odataFilterString: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(private userService: UserService, private memberService: MemberService, private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  searchMember() {
    const query = this.configureODataFilter();
    // this.userService.advancedMemberSearch(query).subscribe(
    this.memberService.advancedMemberSearch(query).subscribe(
      (members: User[]) => {
        if (members.length > 0) {
          this.members = members;
          return;
        }
        this.alertify.error('No Member was found');
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  configureODataFilter() {
    this.email = this.formModel.email;
    this.firstName = this.formModel.firstName;
    this.lastName = this.formModel.lastName;
    this.odataFilterString = ODataFilterBuilder('or')
      .contains(x => x.toLower('Email'), `${this.email}`)
      .contains(x => x.toLower('FirstName'), `${this.firstName}`)
      .contains(x => x.toLower('LastName'), `${this.lastName}`)
      .toString();

    const filter = '?$filter=' + this.odataFilterString;

    return filter;
  }

  selectMember(id: any) {
    this.router.navigate(['/members/', id]);
  }
}

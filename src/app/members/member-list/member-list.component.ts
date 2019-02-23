import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: User[];

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.getMembers();
    this.route.data.subscribe(data => {
      this.members = data['members'];
    });
  }
  // getMembers(): any {
  //   this.userService.getUsers().subscribe((members: User[]) => {
  //     this.members = members;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }



}

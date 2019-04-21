import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {
  formModel = {
    email: null,
    firstName: null,
    lastName: null
  };

  constructor() { }

  ngOnInit() {
  }

  searchMember() {
    
  }

  isFormValid() {
    if (this.formModel.email != null || this.formModel.firstName != null || this.formModel.lastName != null) {
      return true;
    }
    return false;
  }

}

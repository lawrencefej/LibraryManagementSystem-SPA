import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  // @Input() appHasRole: string[];
  isVisible = false;
  currentUser?: User;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    const userRoles = this.currentUser.role;
    // if no roles clear the view container ref
    if (!userRoles) {
      this.viewContainerRef.clear();
    }

    // if user has role needed then render the element
    if (this.authService.isAdmin(this.currentUser)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { moduleProvideDef } from '@angular/core/src/view';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form = {
    password: null,
    confirmPassword: null,
    token: null,
    code: null
  };
  model: any = {};
  resetPasswordForm: FormGroup;
  decodedToken: any;

  constructor(private route: ActivatedRoute, private authService: AuthService,
    private alertify: AlertifyService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.model.code = this.route.snapshot.params.code;
    this.form.token = this.route.snapshot.params.code;
    console.log(this.model);
  }

  createresetPasswordForm() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {Validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  resetPassword() {
    console.log(this.form);
    // this.alertify.success('Password has been reset successfully');
    this.authService.resetPassword(this.form).subscribe(() => {
      this.alertify.success('Password has been reset successfully');
      this.router.navigate(['/login']);
    }, error => {
      this.alertify.error(error);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form = {
    password: null,
    confirmPassword: null,
    code: null,
    userId: null
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form.code = this.route.snapshot.params.code;
    this.form.userId = this.route.snapshot.params.id;
  }

  passwordMatchValidator() {
    return this.form.password === this.form.confirmPassword
      ? null
      : { mismatch: true };
  }

  resetPassword() {
    this.authService.resetPassword(this.form).subscribe(
      () => {
        this.alertify.success('Password has been reset successfully');
        this.router.navigate(['/login']);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
}

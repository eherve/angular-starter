import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
import { Notification } from '../_components/notification/notification';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  public img: Observable<any>;
  public formGroup: FormGroup;
  public loading = false;
  public returnUrl: string;
  public error: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private notification: Notification,
  ) {
  }

  async ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    if (await this.authService.isAuthenticated()) {
      return this.router.navigate([this.returnUrl]);
    }
  }

  async onSubmit() {
    if (this.formGroup.invalid) { return; }
    this.loading = true;
    try {
      const res = await this.authService.login(this.formGroup.value.username, this.formGroup.value.password);
      if (res) {
        this.error = null;
        await this.userService.loadUser();
        this.router.navigate([this.returnUrl]);
        this.notification.show('info',
          { key: `notification_authentificated-as`, data: { username: this.formGroup.value.username } },
          { duration: 500 });
        return this.formGroup.get('username').setValue('');
      }
      this.error = 401;
    } catch (err) {
      this.error = err.status;
    } finally {
      this.formGroup.get('password').setValue('');
      this.loading = false;
      console.log('error', this.error);
    }
  }

}

import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { CustomIconService } from './_services/custom-icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public currentUser;

  constructor(private router: Router, private authService: AuthService, private customIconService: CustomIconService) {
    this.customIconService.init();
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}

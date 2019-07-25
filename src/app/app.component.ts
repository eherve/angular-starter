import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { CustomIconService } from './_services/custom-icon.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('down', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),  // initial
        animate('0.3s', style({ transform: 'translateY(0)' }))  // final
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)' }),  // initial
        animate('0.3s', style({ transform: 'translateY(-100%)' }))  // final
      ])
    ]),
    trigger('left', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),  // initial
        animate('0.3s', style({ transform: 'translateX(0)' }))  // final
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),  // initial
        animate('0.3s', style({ transform: 'translateX(-100%)' }))  // final
      ])
    ])
  ]
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

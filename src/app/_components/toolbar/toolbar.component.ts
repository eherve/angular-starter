import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_classes/user';
import { Subscription } from 'rxjs';
import { Notification } from '../notification/notification';
import { filter, tap } from 'rxjs/operators';

export interface ILink {
  title: string;
  icon?: string;
  url: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    trigger('down', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),  // initial
        animate('0.2s', style({ transform: 'translateY(0)' }))  // final
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)' }),  // initial
        animate('0.2s', style({ transform: 'translateY(-100%)' }))  // final
      ])
    ])
  ]
})
export class ToolbarComponent implements OnInit, OnDestroy {

  public user: User;
  public links: ILink[] = [
    { title: 'home', url: '/home' },
    { title: 'profile', url: '/profile' }
  ];
  public activeLink: ILink;
  private userSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private notification: Notification
  ) { }

  ngOnInit(): void {
    this.setUser(this.userService.$user.value);
    this.userSubscription = this.userService.$user.subscribe(user => this.setUser(user));
    this.routeSubscription = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      tap((event: NavigationEnd) => this.setActiveLink(event))
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
    if (this.routeSubscription) { this.routeSubscription.unsubscribe(); }
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.notification.show('info',
      { key: `notification_disconnected`, data: { username: this.user.username } },
      { duration: 500, hasToolbar: false });
  }

  private async setUser(user: User) {
    this.user = user;
  }

  private setActiveLink(event: NavigationEnd) {
    this.activeLink = this.links.find(l => event.urlAfterRedirects.replace(/([^?]+)(\?.*)?/, '$1').startsWith(l.url));
  }

}

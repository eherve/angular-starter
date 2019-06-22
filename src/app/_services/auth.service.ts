import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static CURRENT_USER_STORAGE_KEY = `${environment.appName}.current-user`;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(User.fromString(localStorage.getItem(AuthService.CURRENT_USER_STORAGE_KEY)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(data => {
        const user = new User(data);
        localStorage.setItem(AuthService.CURRENT_USER_STORAGE_KEY, user.toString());
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  public logout() {
    localStorage.removeItem(AuthService.CURRENT_USER_STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

}

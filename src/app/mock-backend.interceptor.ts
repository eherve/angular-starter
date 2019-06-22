import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

const users = [
  { id: '1', firstname: 'Test', lastname: 'Starter', username: 'test', password: 'password' }
];

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(200))
      .pipe(dematerialize());

    function handleRoute() {
      if (url.endsWith('/users/authenticate') && method === 'POST') { return authenticate(); }
      return next.handle(request);
    }

    function authenticate() {
      const { username, password } = body;
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) { return error('Username or password is incorrect'); }
      return ok({
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname
      });
    }


    function ok(data?) {
      return of(new HttpResponse({ status: 200, body: data }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }
  }
}

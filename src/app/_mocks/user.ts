import { Observable, of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

const users = [
  { id: '1', firstname: 'Test', lastname: 'Starter', username: 'test', password: 'password' }
];

export function authenticate(username: string, password: string): Observable<any> {
  const user = users.find(x => x.username === username && x.password === password);
  if (!user) {
    return throwError({ error: { message: 'Username or password is incorrect' } });
  }
  return of(new HttpResponse({
    status: 200,
    body: {
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname
    }
  }));
}

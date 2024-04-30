import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment';

export interface User {
  id: number;
  username: string;
}

export interface CreateUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$ = new BehaviorSubject<User | undefined | null>(null);

  get currentUser() {
    return this.user$.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  setUser({ id, username }: User) {
    this.user$.next({ id, username });
  }

  register({ username, email, password }: CreateUser) {
    return this.httpClient
      .post<{ user: User; token: string }>(
        `${environment.API_URL}/api/v1/auth/register`,
        { username, email, password }
      )
      .pipe(tap(({ token }) => this.cookieService.set('token', token)));
  }

  login({ email, password }: LoginUser) {
    return this.httpClient
      .post<{ user: User; token: string }>(
        `${environment.API_URL}/api/v1/auth/login`,
        { email, password }
      )
      .pipe(tap(({ token }) => this.cookieService.set('token', token)));
  }

  logout() {
    this.cookieService.delete('token');
    this.user$.next(null);
    this.router.navigate(['/']);
  }
}

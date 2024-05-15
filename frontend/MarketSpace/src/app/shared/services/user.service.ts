import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
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
  ) {
    // Check if user is logged in on initialization
    const user = this.getUserFromLocalStorage();
    if (user) {
      this.user$.next(user);
    }
  }

  setUser(user: User) {
    // Update behavior subject
    this.user$.next(user);
    // Save user to local storage
    this.saveUserToLocalStorage(user);
  }

  register({ username, email, password }: CreateUser) {
    return this.httpClient
      .post<{ user: User; token: string }>(
        `${environment.API_URL}/api/v1/auth/register`,
        { username, email, password }
      )
      .pipe(
        tap(({ user, token }) => {
          this.cookieService.set('token', token, { expires: 1 });
          this.setUser(user);
        })
      );
  }

  login({ email, password }: LoginUser) {
    return this.httpClient
      .post<{ user: User; token: string }>(
        `${environment.API_URL}/api/v1/auth/login`,
        { email, password }
      )
      .pipe(
        tap(({ user, token }) => {
          this.cookieService.set('token', token, { expires: 1 });
          this.setUser(user);
        }),
        switchMap(() => {
          return this.router.navigate(['home']); // Navigate after user is set
        })
      );
  }

  logout() {
    this.cookieService.delete('token');
    this.user$.next(null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): Observable<boolean> {
    const token = this.cookieService.get('token');
    return of(!!token);
  }

  private saveUserToLocalStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User | null {
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }

  private clearUserFromLocalStorage() {
    localStorage.removeItem('currentUser');
  }
}

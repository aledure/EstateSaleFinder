import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.currentUser.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        } else {
          // this.router.navigate(['/', 'login']); <-- no login component yet
          return false;
        }
      })
    );
  }
}

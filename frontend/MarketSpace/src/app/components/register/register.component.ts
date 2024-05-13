import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService, CreateUser } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  private authSubscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: UserService,
    private router: Router
  ) {}

  public submit() {
    if (this.registerForm.invalid) return;

    const formValue = this.registerForm.getRawValue() as CreateUser;
    if (!formValue) return;

    this.authSubscription.add(
      this.authService.register(formValue).subscribe(
        (response) => {
          const { user } = response;
          this.authService.setUser(user);

          const navigationExtras: NavigationExtras = {
            queryParams: { email: user.email },
          };
          this.router.navigate(['/verify-email'], navigationExtras);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}

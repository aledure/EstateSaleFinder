import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailVerificationService } from 'src/app/shared/services/email-verification.service';
import { UserService } from 'src/app/shared/services/user.service'; // Import UserService

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  verificationToken: string | null = null;
  isVerified = false;
  error: string | null = null;
  userEmail: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private emailVerificationService: EmailVerificationService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const verificationToken = params['token'];
      if (verificationToken) {
        this.verificationToken = verificationToken;
        this.verifyEmail();
      }
    });
  }

  verifyEmail() {
    if (this.verificationToken) {
      this.emailVerificationService
        .verifyEmail(this.verificationToken)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              this.updateUserData(response.body.user);
              this.redirectToHome(response.body.user.email);
            } else {
              this.error = response.body.message;
            }
          },
          (error) => {
            this.error = error.error.message;
          }
        );
    }
  }

  updateUserData(updatedUser: any) {
    this.userService.setUser({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      emailVerified: updatedUser.emailVerified,
    });
  }

  redirectToHome(email: string | null) {
    if (email) {
      this.router.navigate(['/home'], { queryParams: { email: email } });
    } else {
      this.router.navigate(['/home']);
    }
  }
}

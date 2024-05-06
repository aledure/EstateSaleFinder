import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailVerificationService } from 'src/app/shared/services/email-verification.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  verificationToken: string | null = null;
  isVerified = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private emailVerificationService: EmailVerificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.verificationToken = params['token'];
      if (this.verificationToken) {
        this.verifyEmail();
      }
    });
  }

  verifyEmail() {
    if (this.verificationToken) {
      this.emailVerificationService
        .verifyEmail(this.verificationToken)
        .subscribe(
          () => {
            this.isVerified = true;
          },
          (error) => {
            this.error = error.error.message;
          }
        );
    }
  }
  redirectToHome() {
    this.router.navigate(['/home']);
  }
}

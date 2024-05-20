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
    private emailVerificationService: EmailVerificationService
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
            console.log('response', response);
            this.isVerified = true;
          },
          (error) => {
            this.error = error.error.message;
          }
        );
    }
  }
}

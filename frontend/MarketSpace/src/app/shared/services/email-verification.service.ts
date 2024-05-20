import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailVerificationService {
  constructor(private http: HttpClient) {}

  verifyEmail(verificationToken: string) {
    return this.http.get(
      `https://estatesalefinder.onrender.com/api/verify-email?token=${verificationToken}`
    );
  }
}

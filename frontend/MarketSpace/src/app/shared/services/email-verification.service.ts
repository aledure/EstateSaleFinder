import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailVerificationService {
  constructor(private http: HttpClient) {}

  verifyEmail(verificationToken: string) {
    return this.http.get(
      // `https://estatesalefinder.onrender.com/api/verify-email?token=${verificationToken}`
      `${environment.API_URL}/api/verify-email?token=${verificationToken}`
    );
  }
}

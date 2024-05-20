import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { ApiService, Sale } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  userSales: Sale[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      console.log('Fetching user profile and sales for userId:', userId);
      this.fetchUserProfile(userId);
      this.fetchUserSales(userId);
    });
  }

  fetchUserProfile(userId: string) {
    const apiUrl = `${environment.API_URL}/api/v1/user/${userId}`;
    console.log(`Fetching user profile with id: ${userId}`);
    this.http.get(apiUrl).subscribe(
      (user: any) => {
        console.log(`User fetched successfully!`);
        this.user = user;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  fetchUserSales(userId: string) {
    console.log('Fetching user sales for userId:', userId);
    this.apiService.getSalesCreatedBy(userId).subscribe(
      (sales) => {
        console.log('Fetched user sales:', sales); // Add this line to check the fetched data
        this.userSales = sales;
      },
      (error) => {
        console.error('Error fetching user sales:', error);
      }
    );
  }
}

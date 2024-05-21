import { Component } from '@angular/core';
import { ApiService, Sale } from 'src/app/shared/services/api.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  sales: Sale[] = [];
  userId: number | undefined;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.apiService.getSales().subscribe((data: Sale[]) => {
      this.sales = data;
    });

    this.userService.isAuthenticated().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.userService.currentUser.subscribe((user) => {
          if (user) {
            this.userId = user.id;
            console.log('User ID:', this.userId);
          } else {
            console.error('User not available.');
          }
        });
      } else {
        console.error('User not authenticated.');
        // Handle the case where the user is not authenticated
        // This could involve redirecting to the login page or showing an error message
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  currentUser: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.userService.isAuthenticated().subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });

    // Initialize user state
    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }

  newSale() {
    this.apiService
      .createSale({
        title: 'Title',
        description: 'Description',
        date: '2024-12-31',
        address: '123 Main St.',
        items: [],
        createdBy: this.currentUser.id,
      })
      .subscribe(
        (response) => {
          console.log('Sale created successfully', response);
          const saleId = response.sale._id;
          console.log('Navigating to sale:', saleId);
          this.router.navigate(['/create', saleId]); // Pass saleId as route parameter
        },
        (error) => {
          console.error('Error creating sale', error);
        }
      );
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { UserService, User } from 'src/app/shared/services/user.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.css'],
})
export class CreateSaleComponent implements OnInit, OnDestroy {
  createSaleForm!: FormGroup;
  currentUser: User | null = null;
  private unsubscribe$ = new Subject<void>();
  isLoggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createSaleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.userService.isAuthenticated().subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
      console.log('Is user logged in:', this.isLoggedIn);
      if (isAuthenticated) {
        this.userService.currentUser.subscribe((user) => {
          if (user !== undefined) {
            this.currentUser = user;
            console.log('Current user:', this.currentUser);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    console.log('Submit button clicked.');

    if (this.createSaleForm.valid && this.currentUser !== null) {
      console.log('Form is valid and current user is available.');

      const createdBy = this.currentUser.id;
      const saleData = { ...this.createSaleForm.value, createdBy };
      console.log('Submitting sale data:', saleData);
      console.log('form value: ', this.createSaleForm.value);

      this.apiService.createSale(saleData).subscribe(
        (response) => {
          console.log('Sale created successfully:', response);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error creating sale:', error);
        }
      );
    } else {
      console.error('User data not available');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddItemFormComponent, {
      width: '400px',
    });
  }
}

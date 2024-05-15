import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.css'],
})
export class CreateSaleComponent implements OnInit, OnDestroy {
  createSaleForm!: FormGroup;
  private unsubscribe$ = new Subject<void>();
  items: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createSaleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required],
      items: this.fb.array([]),
      createdBy: [''],
    });

    this.setUser();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    if (this.createSaleForm.valid) {
      console.log('Form is valid.');

      const saleData = this.createSaleForm.value;
      console.log('Submitting sale data:', saleData);

      this.apiService.createSale(saleData).subscribe(
        (response) => {
          console.log('Sale created successfully:', response);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error creating sale:', error);
        }
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddItemFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((newItemFormValue: any) => {
      if (newItemFormValue) {
        console.log('Received item form value:', newItemFormValue);
        this.apiService.addItem(newItemFormValue).subscribe();
      }
      // if (newItemFormValue) {
      //   const items = this.createSaleForm.get('items') as FormArray;
      //   items.push(this.fb.group(newItemFormValue));
      // }
    });
  }

  setUser(): void {
    this.userService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        if (user) {
          this.createSaleForm.patchValue({
            createdBy: user.id,
          });
        }
      });
  }

  get saleItems(): FormArray {
    return this.createSaleForm.get('items') as FormArray;
  }
}

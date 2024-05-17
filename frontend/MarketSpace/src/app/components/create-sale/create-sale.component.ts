import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  saleId: string | null = null;
  i: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private apiService: ApiService,
    private userService: UserService,
    private route: ActivatedRoute
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

    // Retrieve the saleId from the route parameters
    this.route.params.subscribe((params) => {
      this.saleId = params['saleId'];
      if (this.saleId) {
        console.log('Received saleId:', this.saleId);
        // Fetch existing sale data if necessary
        this.apiService.getSaleById(this.saleId).subscribe((sale) => {
          this.createSaleForm.patchValue(sale);
          this.items = sale.items || [];
          const itemsFormArray = this.createSaleForm.get('items') as FormArray;
          this.items.forEach((item: any) => {
            itemsFormArray.push(this.fb.group(item));
          });
        });
      }
    });
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

      if (this.saleId) {
        // Update existing sale
        this.apiService.updateSale(this.saleId, saleData).subscribe(
          (response) => {
            console.log('Sale updated successfully:', response);
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Error updating sale:', error);
          }
        );
      } else {
        // Create new sale
        this.apiService.createSale(saleData).subscribe(
          (response) => {
            console.log('Sale created successfully:', response);
            this.saleId = response.sale._id; // Ensure response contains the saleId
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Error creating sale:', error);
          }
        );
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddItemFormComponent, {
      width: '400px',
      data: { saleId: this.saleId }, // Pass the saleId to the dialog
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { saleId: string; formData: any }) => {
        if (result) {
          const { saleId, formData } = result;
          this.apiService.addItem(saleId, formData).subscribe(
            (response) => {
              console.log('Item added successfully', response);
              // Add the new item to the FormArray
              const itemsFormArray = this.createSaleForm.get(
                'items'
              ) as FormArray;
              itemsFormArray.push(this.fb.group(response.item));
            },
            (error) => {
              console.error('Error adding item', error);
            }
          );
        }
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

  removeItem(index: number): void {
    const itemsFormArray = this.createSaleForm.get('items') as FormArray;
    itemsFormArray.removeAt(index);
  }

  get saleItems(): FormArray {
    return this.createSaleForm.get('items') as FormArray;
  }
}

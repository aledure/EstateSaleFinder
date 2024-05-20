import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService, Item } from 'src/app/shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.css'],
})
export class EditSaleComponent implements OnInit, OnDestroy {
  editSaleForm: FormGroup;
  editedSale: any;
  private unsubscribe$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<EditSaleComponent>,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.editedSale = {};

    this.setUser();

    this.editSaleForm = this.formBuilder.group({
      id: [data.id],
      title: [data.title, Validators.required],
      description: [data.description],
      address: [data.address],
      date: [data.date],
      items: this.formBuilder.array(
        data.items.map((item: Item) => this.createItemFormGroup(item))
      ),
      createdBy: [''],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    this.apiService.getSaleById(id).subscribe((data: any) => {
      this.editedSale = data;
      console.log('Fetched sale data:', data);

      this.userService.currentUser
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((user) => {
          console.log('User:', user);
          if (user) {
            this.editSaleForm.patchValue({
              createdBy: user.id,
            });
            console.log('Created by:', user.id);
            console.log(
              'Edited sale after setting createdBy:',
              this.editedSale
            );
          }
        });
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSave(): void {
    if (this.editSaleForm.valid) {
      const saleData = this.editSaleForm.value;
      const saleId = saleData.id;

      console.log('Updating sale:', saleData);

      this.apiService.updateSale(saleId, saleData).subscribe(
        (response) => {
          console.log('Sale updated successfully:', response);
          this.dialogRef.close(saleData);
        },
        (error) => {
          console.error('Error updating sale:', error);
        }
      );
    } else {
      console.error('Form is not valid. Cannot submit.');
    }
  }

  private createItemFormGroup(item: Item): FormGroup {
    return this.formBuilder.group({
      name: [item.title],
      description: [item.description],
      imageUrl: [item.photo],
    });
  }

  setUser(): void {
    this.userService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        console.log('User:', user);
        if (user) {
          this.editedSale.createdBy = user.id;
          console.log('Created by:', user.id);
        }
      });
  }

  removeItem(index: number) {
    const itemsFormArray = this.editSaleForm.get('items') as FormArray;
    itemsFormArray.removeAt(index);
    console.log('Item removed at index:', index);
  }

  get itemControls() {
    return (this.editSaleForm.get('items') as FormArray).controls;
  }
}


import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css'],
})
export class AddItemFormComponent implements OnInit {
  @Output() addItem = new EventEmitter<any>();
  addItemForm!: FormGroup;
  saleId: string;


  constructor(public dialogRef: MatDialogRef<AddItemFormComponent>,private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<AddItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.saleId = data.saleId;
  }

  ngOnInit(): void {
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      photo: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.addItemForm.valid) {
      const formData = new FormData();
      formData.append('title', this.addItemForm.value.name);
      formData.append('description', this.addItemForm.value.description);
      formData.append('image', this.addItemForm.value.photo);
      formData.append('saleId', this.saleId); // Ensure saleId is included in the form data

      this.addItem.emit({ saleId: this.saleId, formData: formData });
      this.dialogRef.close({ saleId: this.saleId, formData: formData });
    } else {
      console.error('Form is invalid.');
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addItemForm.get('photo')?.setValue(file);
    }
  }
  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {

    });
}};

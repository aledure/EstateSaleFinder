import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css'],
})
export class AddItemFormComponent implements OnInit {
  @Output() addItem = new EventEmitter<any>();
  addItemForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<AddItemFormComponent>
  ) {}

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
      formData.append('name', this.addItemForm.value.name);
      formData.append('description', this.addItemForm.value.description);
      formData.append('image', this.addItemForm.value.photo);

      this.addItem.emit(formData);

      this.dialogRef.close(formData);
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
}

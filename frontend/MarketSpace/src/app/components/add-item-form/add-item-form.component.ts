import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css'],
})
export class AddItemFormComponent {
  addItemForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddItemFormComponent>) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onSubmit() {
    console.log('Submit button clicked.');
  }
}

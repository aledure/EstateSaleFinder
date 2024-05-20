import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css'],
})
export class AddItemFormComponent {
  addItemForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddItemFormComponent>,private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onSubmit() {
    console.log('Submit button clicked.');
  }
  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {

    });
}};

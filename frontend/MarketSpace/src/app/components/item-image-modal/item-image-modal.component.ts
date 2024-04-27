import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-item-image-modal',
  templateUrl: './item-image-modal.component.html',
  styleUrls: ['./item-image-modal.component.css'],
})
export class ItemImageModalComponent {
  imageUrl: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.imageUrl = data.imageUrl;
  }

  closeModal(): void {
    window.history.back();
  }
}

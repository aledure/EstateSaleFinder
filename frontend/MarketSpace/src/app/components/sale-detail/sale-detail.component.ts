import { Component } from '@angular/core';
import { SALES } from 'src/app/shared/sale';
import { MatDialog } from '@angular/material/dialog';
import { ItemImageModalComponent } from '../item-image-modal/item-image-modal.component';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css'],
})
export class SaleDetailComponent {
  sale = SALES[0];

  constructor(private dialog: MatDialog) {}

  openItemModal(imageUrl: string): void {
    this.dialog.open(ItemImageModalComponent, {
      data: { imageUrl },
      panelClass: 'full-screen-modal',
    });
  }
}

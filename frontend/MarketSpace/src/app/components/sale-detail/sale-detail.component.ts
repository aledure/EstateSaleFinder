import { Component } from '@angular/core';
import { SALES } from 'src/app/shared/sale';
import { MatDialog } from '@angular/material/dialog';
import { ItemImageModalComponent } from '../item-image-modal/item-image-modal.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css'],
})
export class SaleDetailComponent {
  sale = {
    title: '',
    description: '',
    address: '',
    date: '',
    items: [{name: '', imageUrl: ''}],
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id') ?? '';

  this.apiService.getSaleById(id).subscribe((data: any) => {
      this.sale = data;
    });
  }

  openItemModal(imageUrl: string): void {
    this.dialog.open(ItemImageModalComponent, {
      data: { imageUrl },
      panelClass: 'full-screen-modal',
    });
  }
}

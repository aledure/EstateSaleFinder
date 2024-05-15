import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemImageModalComponent } from '../item-image-modal/item-image-modal.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { EditSaleComponent } from '../edit-sale/edit-sale.component';

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
    items: [{ name: '', imageUrl: '' }],
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) {}

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

  editSale() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    const dialogRef = this.dialog.open(EditSaleComponent, {
      data: { id, ...this.sale },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      window.location.reload();
    });
  }

  deleteSale() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.apiService.deleteSale(id).subscribe(
      () => {
        console.log('Sale deleted successfully');
        this.router.navigate(['/sales']);
      },
      (error) => {
        console.error('Error deleting sale:', error);
      }
    );
  }
}

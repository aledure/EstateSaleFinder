import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Item } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { EditSaleComponent } from '../edit-sale/edit-sale.component';
import { ItemImageModalComponent } from '../item-image-modal/item-image-modal.component';
import { UserService, User } from 'src/app/shared/services/user.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css'],
})
export class SaleDetailComponent implements OnInit {
  sale: any = {
    title: '',
    description: '',
    address: '',
    date: '',
    items: [],
  };

  currentUserId: number | undefined;
  isAuthor: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    this.apiService.getSaleById(id).subscribe((data: any) => {
      this.sale = data;
      console.log('Sale:', this.sale);
      console.log('Sale author:', this.sale.createdBy);
      this.checkAuthor();
      this.fetchItemDetails();
    });

    this.userService.currentUser.subscribe((user) => {
      if (user) {
        this.currentUserId = user.id;
        console.log('Current user ID:', this.currentUserId);
      }
    });
  }

  checkAuthor() {
    if (this.currentUserId === this.sale.createdBy._id) {
      this.isAuthor = true;
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }

  fetchItemDetails() {
    const itemPromises: Promise<Item>[] = this.sale.items.map(
      (itemId: string) => this.apiService.getItemById(itemId).toPromise()
    );

    Promise.all(itemPromises).then((items: Item[]) => {
      this.sale.items = items;
      console.log('Sale with item details:', this.sale);
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

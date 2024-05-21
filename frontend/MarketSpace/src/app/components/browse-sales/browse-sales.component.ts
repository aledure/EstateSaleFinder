import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Sale, Item } from 'src/app/shared/services/api.service';
import { HttpClient } from '@angular/common/http';

interface BrowseSalesSale extends Sale {
  firstItemUrl: string;
}

@Component({
  selector: 'app-browse-sales',
  templateUrl: './browse-sales.component.html',
  styleUrls: ['./browse-sales.component.css'],
})
export class BrowseSalesComponent implements OnInit {
  searchTerm: string = '';
  sales: BrowseSalesSale[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getSales();
  }

  searchSales() {
    if (this.searchTerm) {
      this.apiService
        .searchSaleByTitle(this.searchTerm)
        .subscribe((data: BrowseSalesSale[]) => {
          console.log('Search data:', data);
          this.sales = data;
          this.fetchFirstItemImages(data);
        });
    } else {
      this.getSales();
    }
  }

  getSales() {
    this.apiService.getSales().subscribe((data: BrowseSalesSale[]) => {
      console.log('Sales data:', data);
      this.sales = data;
      this.fetchFirstItemImages(data);
    });
  }

  fetchFirstItemImages(sales: BrowseSalesSale[]) {
    sales.forEach((sale) => {
      if (sale.items.length > 0) {
        const firstItemId = sale.items[0];
        this.apiService.getItemById(firstItemId).subscribe((item: Item) => {
          sale.firstItemUrl = item.photo;
          console.log(`Image for sale ${sale.id}:`, item.photo);
        });
      }
    });
  }
}

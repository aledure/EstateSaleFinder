import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Sale } from 'src/app/shared/services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-browse-sales',
  templateUrl: './browse-sales.component.html',
  styleUrls: ['./browse-sales.component.css'],
})
export class BrowseSalesComponent {
  searchTerm: string = '';
  sales: Sale[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private http: HttpClient) { }

  searchSales() {
    if (this.searchTerm) {
      this.apiService.searchSaleByTitle(this.searchTerm).subscribe((data: any) => {
        console.log(data);
        this.sales = data;
      });
    } else {
      this.getSales();
    }
  }

  ngOnInit() {
    this.getSales();
  }

  getSales() {
     this.apiService.getSales().subscribe((data: any) => {
      console.log(data);
      this.sales = data;
    });
  }
}

import { Component } from '@angular/core';
import { ApiService, Sale } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-browse-sales',
  templateUrl: './browse-sales.component.html',
  styleUrls: ['./browse-sales.component.css'],
})
export class BrowseSalesComponent {
  sales: Sale[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getSales().subscribe((data: any) => {
      this.sales = data;
    });
  }
}

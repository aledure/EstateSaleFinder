import { Component } from '@angular/core';
import { ApiService, Sale } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  sales: Sale[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getSales().subscribe((data: any) => {
      this.sales = data;
    });
  }
}
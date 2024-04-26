import { Component } from '@angular/core';
import { SALES } from 'src/app/shared/sale';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css'],
})
export class SaleDetailComponent {
  sale = SALES[0];

  constructor() {}
}

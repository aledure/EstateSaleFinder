import { Component } from '@angular/core';
import { SALES } from 'src/app/shared/sale';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  sales = SALES;

  constructor() {}
}

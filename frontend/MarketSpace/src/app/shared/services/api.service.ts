import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sale {
  id: string;
  _id: string;
  title: string;
  description: string;
  address: string;
  image: string;
  date: string;
  items: Item[];
}

export interface Item {
  name: string;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getSales() {
    return this.http.get(`${this.API_URL}/sales`);
  }

  getSaleById(id: string) {
    return this.http.get(`${this.API_URL}/sales/${id}`);
  }

  createSale(saleData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/sales`, saleData);
  }

  searchSaleByTitle(title: string) {
    return this.http.get(`${this.API_URL}/sales/search/${title}`);
  }

  deleteSale(id: string) {
    return this.http.delete(`${this.API_URL}/sales/${id}`);
  }

  getSalesCreatedBy(userId: string) {
    const url = `${this.API_URL}/api/v1/sales/createdBy/${userId}`;
    console.log('Fetching sales URL:', url); // Add this line to log the URL
    return this.http.get<Sale[]>(url);
  }
}

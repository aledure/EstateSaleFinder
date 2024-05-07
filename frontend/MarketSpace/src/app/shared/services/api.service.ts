import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sale {
  id: string;
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

  createSale(saleData: FormData): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/sales`, saleData);
  }
}

// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  id: string;
  title: string;
  photo: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = environment.API_URL;
  private saleIdSubject = new BehaviorSubject<string | null>(null);
  saleId$ = this.saleIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  getSales(): Observable<any> {
    return this.http.get(`${this.API_URL}/sales`);
  }

  getSaleById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/sales/${id}`);
  }

  createSale(saleData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/sales`, saleData);
  }

  searchSaleByTitle(title: string): Observable<any> {
    return this.http.get(`${this.API_URL}/sales/search/${title}`);
  }

  deleteSale(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/sales/${id}`);
  }

  updateSale(id: string, saleData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/sales/${id}`, saleData);
  }

  addItem(saleId: string, formData: any): Observable<any> {
    console.log('Adding item to sale:', saleId);
    return this.http.post(`${this.API_URL}/items/${saleId}`, formData);
  }

  updateItem(id: string, itemData: any): Observable<any> {
    return this.http.patch(`${this.API_URL}/items/${id}`, itemData);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/items/${id}`);
  }

  getAllItems(): Observable<any> {
    return this.http.get(`${this.API_URL}/items`);
  }

  uploadItemImage(imageData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/items/uploads`, imageData);
  }

  setSaleId(saleId: string) {
    this.saleIdSubject.next(saleId);
  }

  getItemById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/items/${id}`);
  }
}

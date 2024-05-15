import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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
  title: string;
  photo: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = environment.API_URL;
  private itemsSubject = new BehaviorSubject<any[]>([]);
  items$ = this.itemsSubject.asObservable();

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

  updateSale(id: string, saleData: any) {
    return this.http.put(`${this.API_URL}/sales/${id}`, {
      ...saleData,
      createdBy: saleData.createdBy,
    });
  }

  addItem(formdata: any) {
    return this.http.post(`${this.API_URL}/items/0`, formdata, {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      }),
    });
  }
}

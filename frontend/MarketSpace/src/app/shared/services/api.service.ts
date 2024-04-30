import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}

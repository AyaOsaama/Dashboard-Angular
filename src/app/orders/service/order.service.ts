import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iorder } from '../models/iorder';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = `${environment.apiUrl}/orders`;
  private httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getUserOrders(): Observable<Iorder[]> {
    return this.http.get<Iorder[]>(this.baseUrl);
  }

  getOrderById(orderId: string): Observable<{ order: Iorder}> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<{order:Iorder}>(`${this.baseUrl}/${orderId}`,{headers});
  }

  updateOrderStatus(orderId: string, status: string): Observable<Iorder> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.patch<Iorder>(`${this.baseUrl}/${orderId}`,{ status },{ headers });
  }
  

  getAllOrders(): Observable<{ orders: Iorder[] }> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<{ orders: Iorder[] }>(`${environment.apiUrl}/orders/all`, { headers });
  }
  
}
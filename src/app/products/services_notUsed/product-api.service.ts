import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../model/product';
import { ProductVariant } from '../model/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductApiService {

  httpHeaders = {};

  constructor(
    private http: HttpClient 
  ) {

    this.httpHeaders = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      )
    };

  }

  getAllProducts(): Observable<Product[]> {
      const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product[]>(`${environment.apiUrl}/products`, { headers });
  }



  getProdByIdStr(strID: string): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product>(`${environment.apiUrl}/products/${strID}`, { headers });
  }


  addNewProduct(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    const response= this.http.post<any>(`${environment.apiUrl}/products`, formData, { headers });
     return response;
  }
  

  updateProduct(productId: string, updatedProd: Product): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<Product>(`${environment.apiUrl}/products/${productId}`, updatedProd, { headers });
  }

  deleteProduct(productId: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${environment.apiUrl}/products/${productId}`, { headers });
  }

  deleteProductVariant(productId: string, variantId: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${environment.apiUrl}/products/${productId}/variants/${variantId}`, { headers });
  }

  getProductAferSearch(value: string): Observable<Product[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product[]>(`${environment.apiUrl}/products?productName=${value}`, { headers });
  }


}

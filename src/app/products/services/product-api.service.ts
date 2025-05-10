import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../pages/products-list/products-list/models/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductApiService {

  //you can use it just here in this services and concate with "this" URL
  // URL :string = `${environment.baseURL}/products`;


  // the use of this header to set limitation of some who can  send  the data that can be sent to the server
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
    console.log('Token sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Authorization Header:", headers);
    return this.http.get<Product[]>(`${environment.apiUrl}/products`, { headers });
  }


  getProdByIdStr(strID: string): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product>(`${environment.apiUrl}/products/${strID}`, { headers });
  }

  addNewProduct(newProduct: Product): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Product>(`${environment.apiUrl}/products`, newProduct, { headers });
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
    console.log('Token sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Authorization Header:", headers);
    return this.http.delete<void>(`${environment.apiUrl}/products/${productId}/variants/${variantId}`, { headers });
  }


  // getAllIDs(): Observable<string[]> {
  //   // const token = localStorage.getItem('token');
  //   // console.log('Token sent:', token);
  //   // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   // console.log("Authorization Header:", headers);
  //   // return this.http.get<Product[]>(`${environment.apiUrl}/products`, { headers });
  //   return this.getAllProducts().pipe(map((prds) => prds.map((prd) => prd._id)))
  // }

  getProductAferSearch(value: string): Observable<Product[]> {
    const token = localStorage.getItem('token');
    console.log('Token sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Authorization Header:", headers);
    return this.http.get<Product[]>(`${environment.apiUrl}/products?productName=${value}`, { headers });
  }


}

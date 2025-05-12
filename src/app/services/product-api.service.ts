import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../products/pages/products-list/products-list/models/product';
import { ProductVariant } from '../products/pages/products-list/products-list/models/product';
import { environment } from '../../environments/environment';
import id from '@angular/common/locales/id';

@Injectable({
  providedIn: 'root'
})

export class ProductApiService {

  //you can use it just here in this services and concate with "this" URL
  // URL :string = `${environment.baseURL}/products`;


  // the use of this header to set limitation of some who can  send  the data that can be sent to the server
  httpHeaders = {};

  constructor(
    private http: HttpClient  //RestFull ===> API  URL ===> https://localhost:3000/products/  , Methods ==>  get , put , patch , delete , post
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

  //function  type or return Observable it is type is a generic type of An Array type Product model
  getAllProducts(): Observable<Product[]> {
    // return this.http.get<Product[]>('http://localhost:3000/products');
    // return this.http.get<Product[]>(`${environment.apiUrl}/products`);
    const token = localStorage.getItem('token');
    console.log('Token sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Authorization Header:", headers);
    return this.http.get<Product[]>(`${environment.apiUrl}/products`, { headers });
    // return this.http.get<Product[]>(`${environment.apiUrlProd}`);
  }

  // getAllProducts(): Observable<Product[]> {
  //   const token = localStorage.getItem('token');

  //   if (!token) {
  //     console.warn('لا يوجد توكن محفوظ! سيتم إرسال الطلب بدون تفويض.');
  //     return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  //   }

  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<Product[]>(`${environment.apiUrl}/products`, { headers });
  // }

  getProdByIdStr(strID: string): Observable<Product> {
    const token = localStorage.getItem('token');
    console.log('Token sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Authorization Header:", headers);
    // return this.http.get<Product[]>(`${environment.apiUrl}/products`, { headers });
    return this.http.get<Product>(`${environment.apiUrl}/products/${strID}`, { headers });
    // return this.http.get<Product>(`${environment.baseURL}/products/${strID}`);
  }

  // addNewProduct(productData: any, imageFiles: File[]): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //   });

  //   const formData = new FormData();
  //   formData.append('name', JSON.stringify(productData.name ?? { en: '', ar: '' }));

  //   imageFiles.forEach(file => {
  //     formData.append('images', file);
  //   });

  //   return this.http.post<any>(`${environment.apiUrl}/products`, formData, { headers });
  // }
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
    console.log('Token sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Authorization Header:", headers);
    // return this.http.get<Product[]>(`${environment.apiUrl}/products`, { headers });
    return this.http.patch<Product>(`${environment.apiUrl}/products/${productId}`, updatedProd, { headers });
  }

  deleteProduct(productId: string): Observable<void> {
    const token = localStorage.getItem('token');
    console.log('Token sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Authorization Header:", headers);
    // return this.http.get<Product[]>(`${environment.apiUrl}/products`, { headers });
    return this.http.delete<void>(`${environment.apiUrl}/products/${productId}`, { headers });
  }

  deleteProductVariant(productId: string, variantId: string): Observable<void> {
    const token = localStorage.getItem('token');
    console.log('Token sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Authorization Header:", headers);
    // return this.http.get<Product[]>(`${environment.apiUrl}/products`, { headers });
    return this.http.delete<void>(`${environment.apiUrl}/products/${productId}/variants/${variantId}`, { headers });
  }


  getAllIDs(): Observable<string[]> {
    // const token = localStorage.getItem('token');
    // console.log('Token sent:', token);
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // console.log("Authorization Header:", headers);
    // return this.http.get<Product[]>(`${environment.apiUrl}/products`, { headers });
    return this.getAllProducts().pipe(map((prds) => prds.map((prd) => prd._id)))
  }

  //query string here if the backEnd handle as query string
  getProductAferSearch(value: string): Observable<Product[]> {
    const token = localStorage.getItem('token');
    console.log('Token sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Authorization Header:", headers);
    // return this.http.get<Product[]>(`${environment.apiUrl}/products`, { headers });
    return this.http.get<Product[]>(`${environment.apiUrl}/products?productName=${value}`, { headers });
  }


}

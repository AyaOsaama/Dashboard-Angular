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

  getProdByIdStrVariant(strID: string): Observable<{ message: string; product: Product }> {
    const token = localStorage.getItem('token');
    console.log('Token sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Authorization Header:", headers);

    // هنا يتم بناء الـ URL بشكل صحيح باستخدام الـ backticks (`)
    const url = `${environment.apiUrl}/products/${strID}`; // <--- هذا هو التصحيح الرئيسي

    console.log('API URL being called:', url); // للتأكد أن الـ URL صحيح في الـ console

    // استدعاء الـ http.get بالـ URL الصحيح
    // لاحظ: نوع الإرجاع هنا هو Observable<{ message: string; product: Product }>
    // بناءً على ما اخترته أنت، وهذا يعني أن الكومبوننت سيحتاج إلى استخراج product منه
    return this.http.get<{ message: string; product: Product }>(url, { headers });
  }

  addNewProduct(newProduct: Product): Observable<Product> {
    const token = localStorage.getItem('token');
    console.log('Token sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Authorization Header:", headers);
    // return this.http.get<Product[]>(`${environment.apiUrl}/products`, { headers });
    return this.http.post<Product>(`${environment.apiUrl}/products`, newProduct, { headers });
  }

  addVariant(productId: string, addVariant: FormData): Observable<ProductVariant> { // Or Observable<any> depending on backend response
    const token = localStorage.getItem('token');
    console.log('Token sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Authorization Header:", headers);
    // No need to set Content-Type for FormData
    console.log(`Attempting to add variant for product ID: ${productId}`);
    // Make a POST request to the variants endpoint for the specific product
    return this.http.post<ProductVariant>(`${environment.apiUrl}/products/${productId}/variants`, addVariant, { headers });
  }

  // updateProduct(productId: string, updatedProd: Product): Observable<Product> {
  //   const token = localStorage.getItem('token');
  //   console.log('Token sent:', token);
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   console.log("Authorization Header:", headers);
  //   // return this.http.get<Product[]>(`${environment.apiUrl}/products`, { headers });
  //   return this.http.patch<Product>(`${environment.apiUrl}/products/${productId}`, updatedProd, { headers });
  // }

  updateProduct(productId: string, updatedProd: FormData): Observable<Product> {
    const token = localStorage.getItem('token');
    console.log('Token sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<Product>(`${environment.apiUrl}/products/${productId}`, updatedProd, { headers });
  }

  // دالة لتحديث المنتج باستخدام FormData
  // updateProduct(productId: string, formData: FormData): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   console.log('Token sent:', token);
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   console.log("Authorization Header:", headers);
  //   return this.http.patch<Product>(`${environment.apiUrl}/products/${productId}`, formData, { headers });
  // }

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

  // **Placeholder for Update Variant Function (if needed later)**
  // Assuming the backend endpoint is like PATCH /products/:productId/variants/:variantId
  updateVariant(productId: string, variantId: string, variantData: FormData): Observable<ProductVariant> {
    const token = localStorage.getItem('token');
    console.log('Token sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(`Attempting to update variant ID: ${variantId} for product ID: ${productId}`);
    return this.http.patch<ProductVariant>(`${environment.apiUrl}/products/${productId}/variants/${variantId}`, variantData, { headers });
  }




  // getAllIDs(): Observable<string[]> {
  //   // const token = localStorage.getItem('token');
  //   // console.log('Token sent:', token);
  //   // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   // console.log("Authorization Header:", headers);
  //   // return this.http.get<Product[]>(`${environment.apiUrl}/products`, { headers });
  //   return this.getAllProducts().pipe(map((prds) => prds.map((prd) => prd._id)))
  // }

  getAllCategories(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${environment.apiUrl}/categories`, { headers });
  }

  getAllIDs(): Observable<string[]> {
    return this.getAllProducts().pipe(
      map((prds) =>
        prds
          .map((prd) => prd._id)
          .filter((id): id is string => id !== undefined)
      )
    );
  }

  getCategoryById(categoryId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${environment.apiUrl}/categories/${categoryId}`, { headers });
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

  // **NEW FUNCTION: Add a new variant to an existing product**
  // This function takes the product ID and FormData containing variant data and files.
  // Assuming the backend endpoint is like POST /products/:productId/variants
  // addVariant(productId: string, addVariant: FormData): Observable<ProductVariant> { // Or Observable<any> depending on backend response
  //   const token = localStorage.getItem('token');
  //   console.log('Token sent:', token);
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   console.log("Authorization Header:", headers);
  //   // No need to set Content-Type for FormData
  //   console.log(`Attempting to add variant for product ID: ${productId}`);
  //   // Make a POST request to the variants endpoint for the specific product
  //   return this.http.post<ProductVariant>(`${environment.apiUrl}/products/${productId}/variants`, addVariant, { headers });
  // }




}

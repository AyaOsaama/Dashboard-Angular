import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../model/icategory';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  httpHeader={}
  constructor(private http:HttpClient) {
    this.httpHeader={headers:new HttpHeaders({
    'Content-Type':'application/json'
      })}
  }
  getAllCategory(): Observable<{ categories: ICategory[] }> {
    return this.http.get<{ categories: ICategory[] }>(`${environment.apiUrl}/categories`);
  }
  addNewCategory(category:ICategory):Observable<ICategory>{
    return this.http.post<ICategory>(`${environment.apiUrl}/categories`,category,this.httpHeader)
  }
  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/categories/${id}`);
  }
    
  updateCategory(id: string, category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${environment.apiUrl}/categories/${id}`, category, this.httpHeader);
  }
  getCategoryById(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`${environment.apiUrl}/categories/${id}`);
  }  
}
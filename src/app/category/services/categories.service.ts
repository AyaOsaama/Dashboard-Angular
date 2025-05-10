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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ categories: ICategory[] }>(`${environment.apiUrl}/categories`,{headers});
  }
  addNewCategory(category:ICategory):Observable<ICategory>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ICategory>(`${environment.apiUrl}/categories`,category,{headers})
  }
  deleteCategory(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${environment.apiUrl}/categories/${id}`,{headers});
  }
    
  updateCategory(id: string, category: ICategory): Observable<ICategory> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<ICategory>(`${environment.apiUrl}/categories/${id}`, category, {headers});
  }
  getCategoryById(id: string): Observable<ICategory> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ICategory>(`${environment.apiUrl}/categories/${id}`,{headers});
  }  
}
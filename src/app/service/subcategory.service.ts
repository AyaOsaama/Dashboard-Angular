import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubCategory } from '../subcategory/models/subcategories';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryServiceApi {
  private apiUrl = `${environment.apiUrl}/subcategories`
  httpHeaders = {};
  constructor(private http: HttpClient) {
    this.httpHeaders = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      )
    };
  }

  getSubCategories(): Observable<{ subcategories: SubCategory[] }> {
    return this.http.get<{ subcategories: SubCategory[] }>(this.apiUrl);
  }

  addSubCategory(subCategory: SubCategory): Observable<SubCategory> {
    return this.http.post<SubCategory>(this.apiUrl, subCategory);
  }

  updateSubCategory(
    id: string,
    subCategory: SubCategory
  ): Observable<SubCategory> {
    return this.http.put<SubCategory>(`${this.apiUrl}/${id}`, subCategory);
  }

  deleteSubCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // الدالة الجديدة لجلب السب كاتيجوري بناءً على categoryId
  getSubCategoriesByCategoryId(categoryId: string): Observable<{ subcategories: SubCategory[] }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ subcategories: SubCategory[] }>(`${environment.apiUrl}/categories/${categoryId}/subcategories`, { headers });
  }
}

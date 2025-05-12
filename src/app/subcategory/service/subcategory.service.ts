import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubCategory } from '../model/subcategory';

@Injectable({
  providedIn: 'root',
})
export class SubService {
  private apiUrl =
    'https://furniture-backend-production-8726.up.railway.app/subcategories';

  constructor(private http: HttpClient) {}

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
}
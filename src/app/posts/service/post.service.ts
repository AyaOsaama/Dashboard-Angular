import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 private apiUrl =environment.apiUrl;
 httpHeader={}
 
  constructor(private http: HttpClient) { 
    this.httpHeader={headers:new HttpHeaders({
      'Content-Type':'application/json'
        })}
  }

  getAllPosts(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${environment.apiUrl}/posts`,{ headers });
  }

  addPost(data: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/posts`, data, { headers });
  }
  deletePost(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${environment.apiUrl}/posts/${id}`, { headers });
  }
  
    
  updatePost(Id: string, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    const isFormData = data instanceof FormData;
    if (!isFormData) {
      headers = headers.set('Content-Type', 'application/json');
    }
  
    return this.http.put(`${this.apiUrl}/posts/${Id}`, data, { headers });
  }
  updatePostById(id: string, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    const isFormData = data instanceof FormData;
    if (!isFormData) {
      headers = headers.set('Content-Type', 'application/json');
    }
  
    return this.http.put(`${this.apiUrl}/posts/${id}`, data, { headers });
  }
}





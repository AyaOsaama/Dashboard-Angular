import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../models/iuser'; 

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl =environment.apiUrl
  httpHeader={}
  constructor(private http:HttpClient) {
    this.httpHeader={headers:new HttpHeaders({
    'Content-Type':'application/json'
      })}
  }
  getUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${environment.apiUrl}/users`,{ headers });
  }
 
  addUser(data: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/auth/register`, data, { headers });
  }
  deleteUser(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${environment.apiUrl}/users/${id}`, { headers });
  }
  
    
  updateUser(userId: string, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    const isFormData = data instanceof FormData;
    if (!isFormData) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.http.patch(`${this.apiUrl}/users/${userId}`, data, { headers });
  }


  

  
  
  
  getCurrentUserRole(): 'super_admin' | 'admin' | 'user' | null {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.role;
    }
    return null;
  }
}
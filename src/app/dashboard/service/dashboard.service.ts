import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  @Injectable({
    providedIn: 'root',
  })
  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }

  // Orders
  getMonthlySales() {
    return this.http.get<any>(
      `${this.baseUrl}/orders/monthly-sales`,
      this.getHeaders()
    );
  }

  getOrderStatusStats() {
    return this.http.get<any>(
      `${this.baseUrl}/orders/status-stats`,
      this.getHeaders()
    );
  }

  // Carts
  getTopProductsInCart() {
    return this.http.get<any>(
      `${this.baseUrl}/carts/top-products`,
      this.getHeaders()
    );
  }

  getTotalCartItems() {
    return this.http.get<any>(
      `${this.baseUrl}/carts/total-items`,
      this.getHeaders()
    );
  }

  getTotalCartValue() {
    return this.http.get<any>(
      `${this.baseUrl}/carts/total-value`,
      this.getHeaders()
    );
  }
  getUsersWithCartItems() {
    return this.http.get<any>(
      `${this.baseUrl}/carts/users-with-items`,
      this.getHeaders()
    );
  }
  //users
  getAllUsersCount() {
    return this.http.get<any>(`${this.baseUrl}/users/count`, this.getHeaders());
  }
  // Ratings
  getTotalRatings() {
    return this.http.get<any>(
      `${this.baseUrl}/ratings/total`,
      this.getHeaders()
    );
  }

  getAverageRating() {
    return this.http.get<any>(
      `${this.baseUrl}/ratings/average`,
      this.getHeaders()
    );
  }

  getRatingDistribution() {
    return this.http.get<any>(
      `${this.baseUrl}/ratings/distribution`,
      this.getHeaders()
    );
  }

  getRatingsWithComments() {
    return this.http.get<any>(
      `${this.baseUrl}/ratings/with-comments`,
      this.getHeaders()
    );
  }

  getMostRatedProducts() {
    return this.http.get<any>(
      `${this.baseUrl}/ratings/most-rated-products`,
      this.getHeaders()
    );
  }

  // Products
  getTotalProducts() {
    return this.http.get<any>(
      `${this.baseUrl}/products/total-products`,
      this.getHeaders()
    );
  }

  getTotalVariants() {
    return this.http.get<any>(
      `${this.baseUrl}/products/total-variants`,
      this.getHeaders()
    );
  }

  getBrandsCount() {
    return this.http.get<any>(
      `${this.baseUrl}/products/brands-count`,
      this.getHeaders()
    );
  }

  getTopRatedProducts() {
    return this.http.get<any>(
      `${this.baseUrl}/products/top-rated`,
      this.getHeaders()
    );
  }

  getDiscountedVariantsCount() {
    return this.http.get<any>(
      `${this.baseUrl}/products/discounted-variants`,
      this.getHeaders()
    );
  }

  getLowStockVariants() {
    return this.http.get<any>(
      `${this.baseUrl}/products/low-stock`,
      this.getHeaders()
    );
  }
}

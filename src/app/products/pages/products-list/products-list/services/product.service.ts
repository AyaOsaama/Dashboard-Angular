import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // ✅ القائمة الرئيسية للمنتجات
  private productList: Product[] = [];

  // ✅ متغير للبحث
  searching: string = '';

  constructor() {
    // ✅ تحميل بيانات افتراضية عند إنشاء الخدمة
    this.productList = [
      // {
      //   "_id": "SC-1001",
      //   // "code": "SC-1001-PK",
      //   "rating": 4.0,
      //   "variants": [
      //     {
      //       "name": { "en": "Silk Scarf - Pink Floral", "ar": "وشاح حريري - زهري" },
      //       "price": 65.00,
      //       "discountPrice": 58.50,
      //       "color": { "en": "Pink", "ar": "زهري", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
      //       "images": [
      //         "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
      //         "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
      //         "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
      //       ],
      //       "inStock": 130,
      //       "description": { "en": "Elegant pink silk scarf with a beautiful floral pattern.", "ar": "وشاح حريري زهري أنيق بنقشة زهور جميلة." },
      //       "material": { "en": "Silk", "ar": "حرير" }
      //     }
      //   ],
      //   "brand": "SilkStyle",
      //   "categories": { "main": "Accessories", "sub": "Scarves" },
      //   "orderId": [],
      //   "nameEn": "Silk Scarf - Pink Floral",
      //   "nameAr": "وشاح حريري - زهري",
      //   "price": 65.00,
      //   "discountPrice": 58.50,
      //   "colorEn": "Pink",
      //   "colorAr": "زهري",
      //   "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
      //   "images": [
      //     "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
      //     "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
      //     "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
      //   ],
      //   "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
      //   "inStock": 130
      // },
      // {
      //   "_id": "BP-1102",
      //   // "code": "BP-1102-NV",
      //   "rating": 4.7,
      //   "variants": [
      //     {
      //       "name": { "en": "Durable Backpack - Navy Blue", "ar": "حقيبة ظهر متينة - كحلي" },
      //       "price": 75.00,
      //       "discountPrice": 69.00,
      //       "color": { "en": "Navy Blue", "ar": "كحلي", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
      //       "images": [
      //         "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
      //         "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
      //         "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
      //       ],
      //       "inStock": 105,
      //       "description": { "en": "Water-resistant navy blue backpack with multiple compartments.", "ar": "حقيبة ظهر كحلية مقاومة للماء مع عدة أقسام." },
      //       "material": { "en": "Nylon", "ar": "نايلون" }
      //     }
      //   ],
      //   "brand": "TravelMate",
      //   "categories": { "main": "Accessories", "sub": "Bags" },
      //   "orderId": [],
      //   "nameEn": "Durable Backpack",
      //   "nameAr": "حقيبة ظهر متينة",
      //   "price": 75.00,
      //   "discountPrice": 69.00,
      //   "colorEn": "Navy Blue",
      //   "colorAr": "كحلي",
      //   "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
      //   "images": [
      //     "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
      //     "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
      //     "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
      //   ],
      //   "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
      //   "inStock": 105
      // },
      // ✨ أضف المزيد من المنتجات حسب الحاجة
    ];
  }

  // ✅ إرجاع كل المنتجات
  getProducts(): Product[] {
    return this.productList;
  }

  // ✅ إرجاع أول 30 منتج (مناسب لواجهة المعاينة أو الأداء العالي)
  getFirst30Products(): Promise<Product[]> {
    return Promise.resolve(this.productList.slice(0, 30));
  }

  // ✅ إضافة منتج جديد
  addProduct(product: Product): void {
    this.productList.push(product);
  }

  // ✅ البحث عن منتجات بالإنجليزي أو العربي
  // searchProducts(keyword: string): Product[] {
  //   const lowerKeyword = keyword.toLowerCase();
  //   return this.productList.filter(p =>
  //     p.nameEn.toLowerCase().includes(lowerKeyword) ||
  //     p.nameAr.includes(keyword)
  //   );
  // }

  // // ✅ الحصول على منتج بواسطة الـ ID
  // getProductById(id: number): Product | undefined {
  //   return this.productList.find(p => p.id === id);
  // }

  // // ✅ التحقق من تكرار الكود أو الاسم (اختياري)
  // isProductExistsById(id: number): boolean {
  //   return this.productList.some(p => p.id === id);
  // }
}

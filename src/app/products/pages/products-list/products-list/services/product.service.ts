// i created this service with using the cli command  ng g s services/product M.kabil
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productListService: Product[];
  searching!: string;

  //we will need the constructor in future if we need get the data from api M.kabil
  constructor() {
    //here we prepare the data for the api and search
    this.productListService = [
      {
        "_id": "LW-1001",
        "code": "LW-1001-BR",
        "rating": 4.3,
        "variants": [
          {
            "name": { "en": "Classic Leather Wallet - Brown", "ar": "محفظة جلد كلاسيكية - بني" },
            "price": 55.00,
            "discountPrice": 49.99,
            "color": { "en": "Brown", "ar": "بني", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 180,
            "description": { "en": "Genuine brown leather wallet with multiple compartments.", "ar": "محفظة جلد بني أصلي مع عدة أقسام." },
            "material": { "en": "Leather", "ar": "جلد" }
          }
        ],
        "brand": "CraftLeather",
        "categories": { "main": "Accessories", "sub": "Wallets" },
        "orderId": [],
        "nameEn": "Classic Leather Wallet",
        "nameAr": "محفظة جلد كلاسيكية",
        "price": 55.00,
        "discountPrice": 49.99,
        "colorEn": "Brown",
        "colorAr": "بني",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 180
      },
      {
        "_id": "ER-2005",
        "code": "ER-2005-SL",
        "rating": 4.7,
        "variants": [
          {
            "name": { "en": "Sterling Silver Earrings - Leaf Design", "ar": "أقراط فضة استرليني - تصميم ورقة" },
            "price": 39.95,
            "discountPrice": 35.95,
            "color": { "en": "Silver", "ar": "فضي", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 150,
            "description": { "en": "Elegant sterling silver earrings with a delicate leaf design.", "ar": "أقراط فضة استرليني أنيقة بتصميم ورقة رقيق." },
            "material": { "en": "Sterling Silver", "ar": "فضة استرليني" }
          }
        ],
        "brand": "SilverCraft",
        "categories": { "main": "Accessories", "sub": "Jewelry" },
        "orderId": [],
        "nameEn": "Sterling Silver Earrings",
        "nameAr": "أقراط فضة استرليني",
        "price": 39.95,
        "discountPrice": 35.95,
        "colorEn": "Silver",
        "colorAr": "فضي",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 150
      },
      {
        "_id": "TB-3010",
        "code": "TB-3010-RD",
        "rating": 4.5,
        "variants": [
          {
            "name": { "en": "Cotton Blend Trousers - Red", "ar": "بنطلون قطن مخلوط - أحمر" },
            "price": 45.00,
            "discountPrice": 39.99,
            "color": { "en": "Red", "ar": "أحمر", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 120,
            "description": { "en": "Comfortable red cotton blend trousers for casual wear.", "ar": "بنطلون قطن مخلوط أحمر مريح للارتداء اليومي." },
            "material": { "en": "Cotton Blend", "ar": "مزيج القطن" }
          }
        ],
        "brand": "UrbanStyle",
        "categories": { "main": "Apparel", "sub": "Pants" },
        "orderId": [],
        "nameEn": "Cotton Blend Trousers",
        "nameAr": "بنطلون قطن مخلوط",
        "price": 45.00,
        "discountPrice": 39.99,
        "colorEn": "Red",
        "colorAr": "أحمر",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 120
      },
      {
        "_id": "GC-4015",
        "code": "GC-4015-WH",
        "rating": 4.8,
        "variants": [
          {
            "name": { "en": "Wireless Gaming Controller - White", "ar": "وحدة تحكم ألعاب لاسلكية - أبيض" },
            "price": 69.00,
            "discountPrice": 62.99,
            "color": { "en": "White", "ar": "أبيض", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 95,
            "description": { "en": "Ergonomic white wireless gaming controller with responsive buttons.", "ar": "وحدة تحكم ألعاب لاسلكية بيضاء مريحة مع أزرار سريعة الاستجابة." },
            "material": { "en": "Plastic", "ar": "بلاستيك" }
          }
        ],
        "brand": "GameOn",
        "categories": { "main": "Electronics", "sub": "Controllers" },
        "orderId": [],
        "nameEn": "Wireless Gaming Controller",
        "nameAr": "وحدة تحكم ألعاب لاسلكية",
        "price": 69.00,
        "discountPrice": 62.99,
        "colorEn": "White",
        "colorAr": "أبيض",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 95
      },
      {
        "_id": "HB-5002",
        "code": "HB-5002-BL",
        "rating": 4.2,
        "variants": [
          {
            "name": { "en": "Hardcover Book - Mystery Thriller", "ar": "كتاب بغلاف مقوى - إثارة وغموض" },
            "price": 18.50,
            "discountPrice": 16.99,
            "color": { "en": "Blue", "ar": "أزرق", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 220,
            "description": { "en": "A gripping mystery thriller that will keep you guessing until the end.", "ar": "قصة إثارة وغموض مشوقة ستبقيك تخمن حتى النهاية." },
            "material": { "en": "Paper, Cardboard", "ar": "ورق، كرتون" }
          }
        ],
        "brand": "PageTurner",
        "categories": { "main": "Books", "sub": "Mystery" },
        "orderId": [],
        "nameEn": "Mystery Thriller Book",
        "nameAr": "كتاب إثارة وغموض",
        "price": 18.50,
        "discountPrice": 16.99,
        "colorEn": "Blue",
        "colorAr": "أزرق",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 220
      },
      {
        "_id": "SN-6008",
        "code": "SN-6008-GR",
        "rating": 4.4,
        "variants": [
          {
            "name": { "en": "Unisex Sneakers - Grey", "ar": "حذاء رياضي للجنسين - رمادي" },
            "price": 65.00,
            "discountPrice": 59.99,
            "color": { "en": "Grey", "ar": "رمادي", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 140,
            "description": { "en": "Comfortable and stylish grey unisex sneakers.", "ar": "حذاء رياضي رمادي مريح وأنيق للجنسين." },
            "material": { "en": "Canvas, Rubber", "ar": "قماش، مطاط" }
          }
        ],
        "brand": "EasyWalk",
        "categories": { "main": "Shoes", "sub": "Casual" },
        "orderId": [],
        "nameEn": "Unisex Sneakers",
        "nameAr": "حذاء رياضي للجنسين",
        "price": 65.00,
        "discountPrice": 59.99,
        "colorEn": "Grey",
        "colorAr": "رمادي",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 140
      },
      {
        "_id": "LW-1001",
        "code": "LW-1001-BR",
        "rating": 4.3,
        "variants": [
          {
            "name": { "en": "Classic Leather Wallet - Brown", "ar": "محفظة جلد كلاسيكية - بني" },
            "price": 55.00,
            "discountPrice": 49.99,
            "color": { "en": "Brown", "ar": "بني", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 180,
            "description": { "en": "Genuine brown leather wallet with multiple compartments.", "ar": "محفظة جلد بني أصلي مع عدة أقسام." },
            "material": { "en": "Leather", "ar": "جلد" }
          }
        ],
        "brand": "CraftLeather",
        "categories": { "main": "Accessories", "sub": "Wallets" },
        "orderId": [],
        "nameEn": "Classic Leather Wallet",
        "nameAr": "محفظة جلد كلاسيكية",
        "price": 55.00,
        "discountPrice": 49.99,
        "colorEn": "Brown",
        "colorAr": "بني",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 180
      },
      {
        "_id": "ER-2005",
        "code": "ER-2005-SL",
        "rating": 4.7,
        "variants": [
          {
            "name": { "en": "Sterling Silver Earrings - Leaf Design", "ar": "أقراط فضة استرليني - تصميم ورقة" },
            "price": 39.95,
            "discountPrice": 35.95,
            "color": { "en": "Silver", "ar": "فضي", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 150,
            "description": { "en": "Elegant sterling silver earrings with a delicate leaf design.", "ar": "أقراط فضة استرليني أنيقة بتصميم ورقة رقيق." },
            "material": { "en": "Sterling Silver", "ar": "فضة استرليني" }
          }
        ],
        "brand": "SilverCraft",
        "categories": { "main": "Accessories", "sub": "Jewelry" },
        "orderId": [],
        "nameEn": "Sterling Silver Earrings",
        "nameAr": "أقراط فضة استرليني",
        "price": 39.95,
        "discountPrice": 35.95,
        "colorEn": "Silver",
        "colorAr": "فضي",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 150
      },
      {
        "_id": "TB-3010",
        "code": "TB-3010-RD",
        "rating": 4.5,
        "variants": [
          {
            "name": { "en": "Cotton Blend Trousers - Red", "ar": "بنطلون قطن مخلوط - أحمر" },
            "price": 45.00,
            "discountPrice": 39.99,
            "color": { "en": "Red", "ar": "أحمر", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 120,
            "description": { "en": "Comfortable red cotton blend trousers for casual wear.", "ar": "بنطلون قطن مخلوط أحمر مريح للارتداء اليومي." },
            "material": { "en": "Cotton Blend", "ar": "مزيج القطن" }
          }
        ],
        "brand": "UrbanStyle",
        "categories": { "main": "Apparel", "sub": "Pants" },
        "orderId": [],
        "nameEn": "Cotton Blend Trousers",
        "nameAr": "بنطلون قطن مخلوط",
        "price": 45.00,
        "discountPrice": 39.99,
        "colorEn": "Red",
        "colorAr": "أحمر",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 120
      },
      {
        "_id": "GC-4015",
        "code": "GC-4015-WH",
        "rating": 4.8,
        "variants": [
          {
            "name": { "en": "Wireless Gaming Controller - White", "ar": "وحدة تحكم ألعاب لاسلكية - أبيض" },
            "price": 69.00,
            "discountPrice": 62.99,
            "color": { "en": "White", "ar": "أبيض", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 95,
            "description": { "en": "Ergonomic white wireless gaming controller with responsive buttons.", "ar": "وحدة تحكم ألعاب لاسلكية بيضاء مريحة مع أزرار سريعة الاستجابة." },
            "material": { "en": "Plastic", "ar": "بلاستيك" }
          }
        ],
        "brand": "GameOn",
        "categories": { "main": "Electronics", "sub": "Controllers" },
        "orderId": [],
        "nameEn": "Wireless Gaming Controller",
        "nameAr": "وحدة تحكم ألعاب لاسلكية",
        "price": 69.00,
        "discountPrice": 62.99,
        "colorEn": "White",
        "colorAr": "أبيض",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 95
      },
      {
        "_id": "HB-5002",
        "code": "HB-5002-BL",
        "rating": 4.2,
        "variants": [
          {
            "name": { "en": "Hardcover Book - Mystery Thriller", "ar": "كتاب بغلاف مقوى - إثارة وغموض" },
            "price": 18.50,
            "discountPrice": 16.99,
            "color": { "en": "Blue", "ar": "أزرق", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 220,
            "description": { "en": "A gripping mystery thriller that will keep you guessing until the end.", "ar": "قصة إثارة وغموض مشوقة ستبقيك تخمن حتى النهاية." },
            "material": { "en": "Paper, Cardboard", "ar": "ورق، كرتون" }
          }
        ],
        "brand": "PageTurner",
        "categories": { "main": "Books", "sub": "Mystery" },
        "orderId": [],
        "nameEn": "Mystery Thriller Book",
        "nameAr": "كتاب إثارة وغموض",
        "price": 18.50,
        "discountPrice": 16.99,
        "colorEn": "Blue",
        "colorAr": "أزرق",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 220
      },
      {
        "_id": "SN-6008",
        "code": "SN-6008-GR",
        "rating": 4.4,
        "variants": [
          {
            "name": { "en": "Unisex Sneakers - Grey", "ar": "حذاء رياضي للجنسين - رمادي" },
            "price": 65.00,
            "discountPrice": 59.99,
            "color": { "en": "Grey", "ar": "رمادي", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 140,
            "description": { "en": "Comfortable and stylish grey unisex sneakers.", "ar": "حذاء رياضي رمادي مريح وأنيق للجنسين." },
            "material": { "en": "Canvas, Rubber", "ar": "قماش، مطاط" }
          }
        ],
        "brand": "EasyWalk",
        "categories": { "main": "Shoes", "sub": "Casual" },
        "orderId": [],
        "nameEn": "Unisex Sneakers",
        "nameAr": "حذاء رياضي للجنسين",
        "price": 65.00,
        "discountPrice": 59.99,
        "colorEn": "Grey",
        "colorAr": "رمادي",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 140
      },

      {
        "_id": "TB-8012",
        "code": "TB-8012-GN",
        "rating": 4.1,
        "variants": [
          {
            "name": { "en": "Slim Fit Chinos - Green", "ar": "بنطلون تشينو ضيق - أخضر" },
            "price": 49.50,
            "discountPrice": 44.50,
            "color": { "en": "Green", "ar": "أخضر", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 165,
            "description": { "en": "Stylish slim fit green chinos for a smart casual look.", "ar": "بنطلون تشينو أخضر ضيق أنيق لمظهر كاجوال أنيق." },
            "material": { "en": "Cotton, Spandex", "ar": "قطن، سباندكس" }
          }
        ],
        "brand": "SmartLook",
        "categories": { "main": "Apparel", "sub": "Pants" },
        "orderId": [],
        "nameEn": "Slim Fit Chinos",
        "nameAr": "بنطلون تشينو ضيق",
        "price": 49.50,
        "discountPrice": 44.50,
        "colorEn": "Green",
        "colorAr": "أخضر",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 165
      },
      {
        "_id": "MS-9005",
        "code": "MS-9005-BK",
        "rating": 4.6,
        "variants": [
          {
            "name": { "en": "Ergonomic Wireless Mouse - Black", "ar": "فأرة لاسلكية مريحة - أسود" },
            "price": 29.00,
            "discountPrice": 25.99,
            "color": { "en": "Black", "ar": "أسود", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 190,
            "description": { "en": "Comfortable black wireless mouse for office and home use.", "ar": "فأرة لاسلكية سوداء مريحة للاستخدام المكتبي والمنزلي." },
            "material": { "en": "Plastic", "ar": "بلاستيك" }
          }
        ],
        "brand": "OfficePro",
        "categories": { "main": "Electronics", "sub": "Mice" },
        "orderId": [],
        "nameEn": "Ergonomic Wireless Mouse",
        "nameAr": "فأرة لاسلكية مريحة",
        "price": 29.00,
        "discountPrice": 25.99,
        "colorEn": "Black",
        "colorAr": "أسود",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 190
      },
      {
        "_id": "SC-1001",
        "code": "SC-1001-PK",
        "rating": 4.0,
        "variants": [
          {
            "name": { "en": "Silk Scarf - Pink Floral", "ar": "وشاح حريري - زهري" },
            "price": 65.00,
            "discountPrice": 58.50,
            "color": { "en": "Pink", "ar": "زهري", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 130,
            "description": { "en": "Elegant pink silk scarf with a beautiful floral pattern.", "ar": "وشاح حريري زهري أنيق بنقشة زهور جميلة." },
            "material": { "en": "Silk", "ar": "حرير" }
          }
        ],
        "brand": "SilkStyle",
        "categories": { "main": "Accessories", "sub": "Scarves" },
        "orderId": [],
        "nameEn": "Silk Scarf - Pink Floral",
        "nameAr": "وشاح حريري - زهري",
        "price": 65.00,
        "discountPrice": 58.50,
        "colorEn": "Pink",
        "colorAr": "زهري",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 130
      },
      {
        "_id": "BP-1102",
        "code": "BP-1102-NV",
        "rating": 4.7,
        "variants": [
          {
            "name": { "en": "Durable Backpack - Navy Blue", "ar": "حقيبة ظهر متينة - كحلي" },
            "price": 75.00,
            "discountPrice": 69.00,
            "color": { "en": "Navy Blue", "ar": "كحلي", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 105,
            "description": { "en": "Water-resistant navy blue backpack with multiple compartments.", "ar": "حقيبة ظهر كحلية مقاومة للماء مع عدة أقسام." },
            "material": { "en": "Nylon", "ar": "نايلون" }
          }
        ],
        "brand": "TravelMate",
        "categories": { "main": "Accessories", "sub": "Bags" },
        "orderId": [],
        "nameEn": "Durable Backpack",
        "nameAr": "حقيبة ظهر متينة",
        "price": 75.00,
        "discountPrice": 69.00,
        "colorEn": "Navy Blue",
        "colorAr": "كحلي",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 105
      },
      {
        "_id": "LT-1201",
        "code": "LT-1201-WH",
        "rating": 4.3,
        "variants": [
          {
            "name": { "en": "LED Desk Lamp - White", "ar": "مصباح مكتب LED - أبيض" },
            "price": 32.00,
            "discountPrice": 28.99,
            "color": { "en": "White", "ar": "أبيض", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 170,
            "description": { "en": "Adjustable white LED desk lamp with multiple brightness levels.", "ar": "مصباح مكتب LED أبيض قابل للتعديل مع مستويات سطوع متعددة." },
            "material": { "en": "Plastic, Metal", "ar": "بلاستيك، معدن" }
          }
        ],
        "brand": "BrightLight",
        "categories": { "main": "Home & Office", "sub": "Lighting" },
        "orderId": [],
        "nameEn": "LED Desk Lamp",
        "nameAr": "مصباح مكتب LED",
        "price": 32.00,
        "discountPrice": 28.99,
        "colorEn": "White",
        "colorAr": "أبيض",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 170
      },
      {
        "_id": "CK-1301",
        "code": "CK-1301-RD",
        "rating": 4.5,
        "variants": [
          {
            "name": { "en": "Ceramic Coffee Mug - Red", "ar": "كوب قهوة سيراميك - أحمر" },
            "price": 12.50,
            "discountPrice": 10.99,
            "color": { "en": "Red", "ar": "أحمر", "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg" },
            "images": [
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
              "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
            ],
            "inStock": 250,
            "description": { "en": "Classic red ceramic coffee mug, perfect for your morning coffee.", "ar": "كوب قهوة سيراميك أحمر كلاسيكي، مثالي لقهوة الصباح." },
            "material": { "en": "Ceramic", "ar": "سيراميك" }
          }
        ],
        "brand": "HomeEssentials",
        "categories": { "main": "Home & Office", "sub": "Kitchenware" },
        "orderId": [],
        "nameEn": "Ceramic Coffee Mug",
        "nameAr": "كوب قهوة سيراميك",
        "price": 12.50,
        "discountPrice": 10.99,
        "colorEn": "Red",
        "colorAr": "أحمر",
        "colorImage": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "images": [
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
          "https://www2.0zz0.com/2025/04/30/23/669924012.jpg"
        ],
        "image": "https://www2.0zz0.com/2025/04/30/23/669924012.jpg",
        "inStock": 250
      },

    ]
  }

  getProductsData() {
    return this.productListService;
  }

  getProductsAll() {
    return Promise.resolve(this.getProductsData().slice(0, 30));
  }


  // getProductsWithOrdersData() {
  //   return [
  //     {
  //       id: '1000',
  //       code: 'f230fh0g3',
  //       name: 'Bamboo Watch',
  //       description: 'Product Description',
  //       image: 'bamboo-watch.jpg',
  //       price: 65, discountPrice: 50,
  //       category: 'Accessories',
  //       quantity: 24,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 5,
  //       orders: [
  //         {
  //           id: '1000-0',
  //           productCode: 'f230fh0g3',
  //           date: '2020-09-13',
  //           amount: 65,
  //           quantity: 1,
  //           customer: 'David James',
  //           status: 'PENDING'
  //         },
  //         {
  //           id: '1000-1',
  //           productCode: 'f230fh0g3',
  //           date: '2020-05-14',
  //           amount: 130,
  //           quantity: 2,
  //           customer: 'Leon Rodrigues',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1000-2',
  //           productCode: 'f230fh0g3',
  //           date: '2019-01-04',
  //           amount: 65,
  //           quantity: 1,
  //           customer: 'Juan Alejandro',
  //           status: 'RETURNED'
  //         },
  //         {
  //           id: '1000-3',
  //           productCode: 'f230fh0g3',
  //           date: '2020-09-13',
  //           amount: 195,
  //           quantity: 3,
  //           customer: 'Claire Morrow',
  //           status: 'CANCELLED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1001',
  //       code: 'nvklal433',
  //       name: 'Black Watch',
  //       description: 'Product Description',
  //       image: 'black-watch.jpg',
  //       price: 72,
  //       category: 'Accessories',
  //       quantity: 61,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 4,
  //       orders: [
  //         {
  //           id: '1001-0',
  //           productCode: 'nvklal433',
  //           date: '2020-05-14',
  //           amount: 72,
  //           quantity: 1,
  //           customer: 'Maisha Jefferson',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1001-1',
  //           productCode: 'nvklal433',
  //           date: '2020-02-28',
  //           amount: 144,
  //           quantity: 2,
  //           customer: 'Octavia Murillo',
  //           status: 'PENDING'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1002',
  //       code: 'zz21cz3c1',
  //       name: 'Blue Band',
  //       description: 'Product Description',
  //       image: 'blue-band.jpg',
  //       price: 79,
  //       category: 'Fitness',
  //       quantity: 2,
  //       inventoryStatus: 'LOWSTOCK',
  //       rating: 3,
  //       orders: [
  //         {
  //           id: '1002-0',
  //           productCode: 'zz21cz3c1',
  //           date: '2020-07-05',
  //           amount: 79,
  //           quantity: 1,
  //           customer: 'Stacey Leja',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1002-1',
  //           productCode: 'zz21cz3c1',
  //           date: '2020-02-06',
  //           amount: 79,
  //           quantity: 1,
  //           customer: 'Ashley Wickens',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1003',
  //       code: '244wgerg2',
  //       name: 'Blue T-Shirt',
  //       description: 'Product Description',
  //       image: 'blue-t-shirt.jpg',
  //       price: 29,
  //       category: 'Clothing',
  //       quantity: 25,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 5,
  //       orders: []
  //     },
  //     {
  //       id: '1004',
  //       code: 'h456wer53',
  //       name: 'Bracelet',
  //       description: 'Product Description',
  //       image: 'bracelet.jpg',
  //       price: 15,
  //       category: 'Accessories',
  //       quantity: 73,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 4,
  //       orders: [
  //         {
  //           id: '1004-0',
  //           productCode: 'h456wer53',
  //           date: '2020-09-05',
  //           amount: 60,
  //           quantity: 4,
  //           customer: 'Mayumi Misaki',
  //           status: 'PENDING'
  //         },
  //         {
  //           id: '1004-1',
  //           productCode: 'h456wer53',
  //           date: '2019-04-16',
  //           amount: 2,
  //           quantity: 30,
  //           customer: 'Francesco Salvatore',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1005',
  //       code: 'av2231fwg',
  //       name: 'Brown Purse',
  //       description: 'Product Description',
  //       image: 'brown-purse.jpg',
  //       price: 120,
  //       category: 'Accessories',
  //       quantity: 0,
  //       inventoryStatus: 'OUTOFSTOCK',
  //       rating: 4,
  //       orders: [
  //         {
  //           id: '1005-0',
  //           productCode: 'av2231fwg',
  //           date: '2020-01-25',
  //           amount: 120,
  //           quantity: 1,
  //           customer: 'Isabel Sinclair',
  //           status: 'RETURNED'
  //         },
  //         {
  //           id: '1005-1',
  //           productCode: 'av2231fwg',
  //           date: '2019-03-12',
  //           amount: 240,
  //           quantity: 2,
  //           customer: 'Lionel Clifford',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1005-2',
  //           productCode: 'av2231fwg',
  //           date: '2019-05-05',
  //           amount: 120,
  //           quantity: 1,
  //           customer: 'Cody Chavez',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1006',
  //       code: 'bib36pfvm',
  //       name: 'Chakra Bracelet',
  //       description: 'Product Description',
  //       image: 'chakra-bracelet.jpg',
  //       price: 32,
  //       category: 'Accessories',
  //       quantity: 5,
  //       inventoryStatus: 'LOWSTOCK',
  //       rating: 3,
  //       orders: [
  //         {
  //           id: '1006-0',
  //           productCode: 'bib36pfvm',
  //           date: '2020-02-24',
  //           amount: 32,
  //           quantity: 1,
  //           customer: 'Arvin Darci',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1006-1',
  //           productCode: 'bib36pfvm',
  //           date: '2020-01-14',
  //           amount: 64,
  //           quantity: 2,
  //           customer: 'Izzy Jones',
  //           status: 'PENDING'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1007',
  //       code: 'mbvjkgip5',
  //       name: 'Galaxy Earrings',
  //       description: 'Product Description',
  //       image: 'galaxy-earrings.jpg',
  //       price: 34,
  //       category: 'Accessories',
  //       quantity: 23,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 5,
  //       orders: [
  //         {
  //           id: '1007-0',
  //           productCode: 'mbvjkgip5',
  //           date: '2020-06-19',
  //           amount: 34,
  //           quantity: 1,
  //           customer: 'Jennifer Smith',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1008',
  //       code: 'vbb124btr',
  //       name: 'Game Controller',
  //       description: 'Product Description',
  //       image: 'game-controller.jpg',
  //       price: 99,
  //       category: 'Electronics',
  //       quantity: 2,
  //       inventoryStatus: 'LOWSTOCK',
  //       rating: 4,
  //       orders: [
  //         {
  //           id: '1008-0',
  //           productCode: 'vbb124btr',
  //           date: '2020-01-05',
  //           amount: 99,
  //           quantity: 1,
  //           customer: 'Jeanfrancois David',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1008-1',
  //           productCode: 'vbb124btr',
  //           date: '2020-01-19',
  //           amount: 198,
  //           quantity: 2,
  //           customer: 'Ivar Greenwood',
  //           status: 'RETURNED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1009',
  //       code: 'cm230f032',
  //       name: 'Gaming Set',
  //       description: 'Product Description',
  //       image: 'gaming-set.jpg',
  //       price: 299,
  //       category: 'Electronics',
  //       quantity: 63,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 3,
  //       orders: [
  //         {
  //           id: '1009-0',
  //           productCode: 'cm230f032',
  //           date: '2020-06-24',
  //           amount: 299,
  //           quantity: 1,
  //           customer: 'Kadeem Mujtaba',
  //           status: 'PENDING'
  //         },
  //         {
  //           id: '1009-1',
  //           productCode: 'cm230f032',
  //           date: '2020-05-11',
  //           amount: 299,
  //           quantity: 1,
  //           customer: 'Ashley Wickens',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1009-2',
  //           productCode: 'cm230f032',
  //           date: '2019-02-07',
  //           amount: 299,
  //           quantity: 1,
  //           customer: 'Julie Johnson',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1009-3',
  //           productCode: 'cm230f032',
  //           date: '2020-04-26',
  //           amount: 299,
  //           quantity: 1,
  //           customer: 'Tony Costa',
  //           status: 'CANCELLED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1010',
  //       code: 'plb34234v',
  //       name: 'Gold Phone Case',
  //       description: 'Product Description',
  //       image: 'gold-phone-case.jpg',
  //       price: 24,
  //       category: 'Accessories',
  //       quantity: 0,
  //       inventoryStatus: 'OUTOFSTOCK',
  //       rating: 4,
  //       orders: [
  //         {
  //           id: '1010-0',
  //           productCode: 'plb34234v',
  //           date: '2020-02-04',
  //           amount: 24,
  //           quantity: 1,
  //           customer: 'James Butt',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1010-1',
  //           productCode: 'plb34234v',
  //           date: '2020-05-05',
  //           amount: 48,
  //           quantity: 2,
  //           customer: 'Josephine Darakjy',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1011',
  //       code: '4920nnc2d',
  //       name: 'Green Earbuds',
  //       description: 'Product Description',
  //       image: 'green-earbuds.jpg',
  //       price: 89,
  //       category: 'Electronics',
  //       quantity: 23,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 4,
  //       orders: [
  //         {
  //           id: '1011-0',
  //           productCode: '4920nnc2d',
  //           date: '2020-06-01',
  //           amount: 89,
  //           quantity: 1,
  //           customer: 'Art Venere',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1012',
  //       code: '250vm23cc',
  //       name: 'Green T-Shirt',
  //       description: 'Product Description',
  //       image: 'green-t-shirt.jpg',
  //       price: 49,
  //       category: 'Clothing',
  //       quantity: 74,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 5,
  //       orders: [
  //         {
  //           id: '1012-0',
  //           productCode: '250vm23cc',
  //           date: '2020-02-05',
  //           amount: 49,
  //           quantity: 1,
  //           customer: 'Lenna Paprocki',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1012-1',
  //           productCode: '250vm23cc',
  //           date: '2020-02-15',
  //           amount: 49,
  //           quantity: 1,
  //           customer: 'Donette Foller',
  //           status: 'PENDING'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1013',
  //       code: 'fldsmn31b',
  //       name: 'Grey T-Shirt',
  //       description: 'Product Description',
  //       image: 'grey-t-shirt.jpg',
  //       price: 48,
  //       category: 'Clothing',
  //       quantity: 0,
  //       inventoryStatus: 'OUTOFSTOCK',
  //       rating: 3,
  //       orders: [
  //         {
  //           id: '1013-0',
  //           productCode: 'fldsmn31b',
  //           date: '2020-04-01',
  //           amount: 48,
  //           quantity: 1,
  //           customer: 'Simona Morasca',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1014',
  //       code: 'waas1x2as',
  //       name: 'Headphones',
  //       description: 'Product Description',
  //       image: 'headphones.jpg',
  //       price: 175,
  //       category: 'Electronics',
  //       quantity: 8,
  //       inventoryStatus: 'LOWSTOCK',
  //       rating: 5,
  //       orders: [
  //         {
  //           id: '1014-0',
  //           productCode: 'waas1x2as',
  //           date: '2020-05-15',
  //           amount: 175,
  //           quantity: 1,
  //           customer: 'Lenna Paprocki',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1014-1',
  //           productCode: 'waas1x2as',
  //           date: '2020-01-02',
  //           amount: 175,
  //           quantity: 1,
  //           customer: 'Donette Foller',
  //           status: 'CANCELLED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1015',
  //       code: 'vb34btbg5',
  //       name: 'Light Green T-Shirt',
  //       description: 'Product Description',
  //       image: 'light-green-t-shirt.jpg',
  //       price: 49,
  //       category: 'Clothing',
  //       quantity: 34,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 4,
  //       orders: [
  //         {
  //           id: '1015-0',
  //           productCode: 'vb34btbg5',
  //           date: '2020-07-02',
  //           amount: 98,
  //           quantity: 2,
  //           customer: 'Mitsue Tollner',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1016',
  //       code: 'k8l6j58jl',
  //       name: 'Lime Band',
  //       description: 'Product Description',
  //       image: 'lime-band.jpg',
  //       price: 79,
  //       category: 'Fitness',
  //       quantity: 12,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 3,
  //       orders: []
  //     },
  //     {
  //       id: '1017',
  //       code: 'v435nn85n',
  //       name: 'Mini Speakers',
  //       description: 'Product Description',
  //       image: 'mini-speakers.jpg',
  //       price: 85,
  //       category: 'Clothing',
  //       quantity: 42,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 4,
  //       orders: [
  //         {
  //           id: '1017-0',
  //           productCode: 'v435nn85n',
  //           date: '2020-07-12',
  //           amount: 85,
  //           quantity: 1,
  //           customer: 'Minna Amigon',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1018',
  //       code: '09zx9c0zc',
  //       name: 'Painted Phone Case',
  //       description: 'Product Description',
  //       image: 'painted-phone-case.jpg',
  //       price: 56,
  //       category: 'Accessories',
  //       quantity: 41,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 5,
  //       orders: [
  //         {
  //           id: '1018-0',
  //           productCode: '09zx9c0zc',
  //           date: '2020-07-01',
  //           amount: 56,
  //           quantity: 1,
  //           customer: 'Abel Maclead',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1018-1',
  //           productCode: '09zx9c0zc',
  //           date: '2020-05-02',
  //           amount: 56,
  //           quantity: 1,
  //           customer: 'Minna Amigon',
  //           status: 'RETURNED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1019',
  //       code: 'mnb5mb2m5',
  //       name: 'Pink Band',
  //       description: 'Product Description',
  //       image: 'pink-band.jpg',
  //       price: 79,
  //       category: 'Fitness',
  //       quantity: 63,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 4,
  //       orders: []
  //     },
  //     {
  //       id: '1020',
  //       code: 'r23fwf2w3',
  //       name: 'Pink Purse',
  //       description: 'Product Description',
  //       image: 'pink-purse.jpg',
  //       price: 110,
  //       category: 'Accessories',
  //       quantity: 0,
  //       inventoryStatus: 'OUTOFSTOCK',
  //       rating: 4,
  //       orders: [
  //         {
  //           id: '1020-0',
  //           productCode: 'r23fwf2w3',
  //           date: '2020-05-29',
  //           amount: 110,
  //           quantity: 1,
  //           customer: 'Kiley Caldarera',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1020-1',
  //           productCode: 'r23fwf2w3',
  //           date: '2020-02-11',
  //           amount: 220,
  //           quantity: 2,
  //           customer: 'Graciela Ruta',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1021',
  //       code: 'pxpzczo23',
  //       name: 'Purple Band',
  //       description: 'Product Description',
  //       image: 'purple-band.jpg',
  //       price: 79,
  //       category: 'Fitness',
  //       quantity: 6,
  //       inventoryStatus: 'LOWSTOCK',
  //       rating: 3,
  //       orders: [
  //         {
  //           id: '1021-0',
  //           productCode: 'pxpzczo23',
  //           date: '2020-02-02',
  //           amount: 79,
  //           quantity: 1,
  //           customer: 'Cammy Albares',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1022',
  //       code: '2c42cb5cb',
  //       name: 'Purple Gemstone Necklace',
  //       description: 'Product Description',
  //       image: 'purple-gemstone-necklace.jpg',
  //       price: 45,
  //       category: 'Accessories',
  //       quantity: 62,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 4,
  //       orders: [
  //         {
  //           id: '1022-0',
  //           productCode: '2c42cb5cb',
  //           date: '2020-06-29',
  //           amount: 45,
  //           quantity: 1,
  //           customer: 'Mattie Poquette',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1022-1',
  //           productCode: '2c42cb5cb',
  //           date: '2020-02-11',
  //           amount: 135,
  //           quantity: 3,
  //           customer: 'Meaghan Garufi',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1023',
  //       code: '5k43kkk23',
  //       name: 'Purple T-Shirt',
  //       description: 'Product Description',
  //       image: 'purple-t-shirt.jpg',
  //       price: 49,
  //       category: 'Clothing',
  //       quantity: 2,
  //       inventoryStatus: 'LOWSTOCK',
  //       rating: 5,
  //       orders: [
  //         {
  //           id: '1023-0',
  //           productCode: '5k43kkk23',
  //           date: '2020-04-15',
  //           amount: 49,
  //           quantity: 1,
  //           customer: 'Gladys Rim',
  //           status: 'RETURNED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1024',
  //       code: 'lm2tny2k4',
  //       name: 'Shoes',
  //       description: 'Product Description',
  //       image: 'shoes.jpg',
  //       price: 64,
  //       category: 'Clothing',
  //       quantity: 0,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 4,
  //       orders: []
  //     },
  //     {
  //       id: '1025',
  //       code: 'nbm5mv45n',
  //       name: 'Sneakers',
  //       description: 'Product Description',
  //       image: 'sneakers.jpg',
  //       price: 78,
  //       category: 'Clothing',
  //       quantity: 52,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 4,
  //       orders: [
  //         {
  //           id: '1025-0',
  //           productCode: 'nbm5mv45n',
  //           date: '2020-02-19',
  //           amount: 78,
  //           quantity: 1,
  //           customer: 'Yuki Whobrey',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1025-1',
  //           productCode: 'nbm5mv45n',
  //           date: '2020-05-21',
  //           amount: 78,
  //           quantity: 1,
  //           customer: 'Fletcher Flosi',
  //           status: 'PENDING'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1026',
  //       code: 'zx23zc42c',
  //       name: 'Teal T-Shirt',
  //       description: 'Product Description',
  //       image: 'teal-t-shirt.jpg',
  //       price: 49,
  //       category: 'Clothing',
  //       quantity: 3,
  //       inventoryStatus: 'LOWSTOCK',
  //       rating: 3,
  //       orders: [
  //         {
  //           id: '1026-0',
  //           productCode: 'zx23zc42c',
  //           date: '2020-04-24',
  //           amount: 98,
  //           quantity: 2,
  //           customer: 'Bette Nicka',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1027',
  //       code: 'acvx872gc',
  //       name: 'Yellow Earbuds',
  //       description: 'Product Description',
  //       image: 'yellow-earbuds.jpg',
  //       price: 89,
  //       category: 'Electronics',
  //       quantity: 35,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 3,
  //       orders: [
  //         {
  //           id: '1027-0',
  //           productCode: 'acvx872gc',
  //           date: '2020-01-29',
  //           amount: 89,
  //           quantity: 1,
  //           customer: 'Veronika Inouye',
  //           status: 'DELIVERED'
  //         },
  //         {
  //           id: '1027-1',
  //           productCode: 'acvx872gc',
  //           date: '2020-06-11',
  //           amount: 89,
  //           quantity: 1,
  //           customer: 'Willard Kolmetz',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     },
  //     {
  //       id: '1028',
  //       code: 'tx125ck42',
  //       name: 'Yoga Mat',
  //       description: 'Product Description',
  //       image: 'yoga-mat.jpg',
  //       price: 20,
  //       category: 'Fitness',
  //       quantity: 15,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 5,
  //       orders: []
  //     },
  //     {
  //       id: '1029',
  //       code: 'gwuby345v',
  //       name: 'Yoga Set',
  //       description: 'Product Description',
  //       image: 'yoga-set.jpg',
  //       price: 20,
  //       category: 'Fitness',
  //       quantity: 25,
  //       inventoryStatus: 'INSTOCK',
  //       rating: 8,
  //       orders: [
  //         {
  //           id: '1029-0',
  //           productCode: 'gwuby345v',
  //           date: '2020-02-14',
  //           amount: 4,
  //           quantity: 80,
  //           customer: 'Maryann Royster',
  //           status: 'DELIVERED'
  //         }
  //       ]
  //     }
  //   ];
  // }

  // getProductsMini() {
  //   return Promise.resolve(this.getProductsData().slice(0, 30));
  // }

  // getProductsSmall() {
  //   return Promise.resolve(this.getProductsData().slice(0, 10));
  // }

  // getProducts() {
  //   return Promise.resolve(this.getProductsData());
  // }

  // doSearchProduct(searchQ: string): Product[] {
  //   this.searching = searchQ;
  //   return this.productListService.filter((product) => product.name.toLowerCase().includes(this.searching?.toLowerCase()));
  // }

  // getProductsWithOrdersSmall() {
  //   return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
  // }

  // getProductsWithOrders() {
  //   return Promise.resolve(this.getProductsWithOrdersData());
  // }
}

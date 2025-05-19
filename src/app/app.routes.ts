import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsListComponent } from './products/pages/products-list/products-list/products-list.component';
import { InsertProductComponent } from './products/pages/insert-product/insert-product/insert-product.component';
import { CategoriesListComponent } from './category/pages/categories-list/categories-list.component';
import { InsertCategoryComponent } from './category/pages/insert-category/insert-category.component';
import { SubCategoriesListComponent } from './subcategory/pages/subcategories-list/subcategories-list/subcategories-list.component';
import { InsertSubcategoriesListComponent } from './subcategory/pages/insert-subcategory/insert-subcategory/insert-subcategory.component';
import { UsersListComponent } from './users/pages/users-list/users-list/users-list.component';
import { InsertUserComponent } from './users/pages/insert-user/insert-user/insert-user.component';
import { PostsListComponent } from './posts/pages/posts-list/posts-list/posts-list.component';
import { InsertPostComponent } from './posts/pages/insert-post/insert-post/insert-post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { loginGuard } from './Gurads/login.guard';
import { authGuard } from './Gurads/auth.guard';
import { LoginComponent } from './auth/login/pages/login.component.js'; import { OrdersListComponent } from './orders/pages/orders-list/orders-list/orders-list.component';
import { OrderDetailsComponent } from './orders/pages/order-details/order-details.component';
import { TestComponent } from './test/test.component';
import { ProductControlComponent } from './products/pages/product-control/product-control.component';
// import { ProductControlComponent } from './products/pages/product-control/product-control/product-control.component';
// import { EditProductComponent } from './products/pages/edit-product/edit-product.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  {
    path: '', redirectTo: 'login', pathMatch: 'full',
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'test', component: TestComponent },
      { path: 'dashboard', component: DashboardComponent },

      { path: 'products', component: ProductsListComponent },
      { path: 'products/insert', component: InsertProductComponent },
      { path: 'products/product-control/:idFromURL', component: ProductControlComponent },
      // { path: 'products/edit-product/:id', component: EditProductComponent },


      { path: 'categories', component: CategoriesListComponent },
      { path: 'categories/insert', component: InsertCategoryComponent },

      { path: 'subcategories', component: SubCategoriesListComponent },
      { path: 'subcategories/insert', component: InsertSubcategoriesListComponent },

      { path: 'orders', component: OrdersListComponent },
      { path: 'orders/:id', component: OrderDetailsComponent },

      { path: 'users', component: UsersListComponent },
      { path: 'users/insert', component: InsertUserComponent },

      { path: 'posts', component: PostsListComponent },
      { path: 'posts/insert', component: InsertPostComponent },

    ]
  },

  { path: '**', component: NotFoundComponent }
];


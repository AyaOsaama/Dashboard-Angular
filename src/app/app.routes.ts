import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginComponent } from './auth/login/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsListComponent } from './products/pages/products-list/products-list/products-list.component';
import { InsertProductComponent } from './products/pages/insert-product/insert-product/insert-product.component';
import { CategoriesListComponent } from './category/categories-list/categories-list/categories-list.component';
import { InsertCategoryComponent } from './category/insert-category/insert-category/insert-category.component';
import { SubcategoriesListComponent } from './subcategory/pages/subcategories-list/subcategories-list/subcategories-list.component';
import { InsertSubcategoryComponent } from './subcategory/pages/insert-subcategory/insert-subcategory/insert-subcategory.component';
import { UsersListComponent } from './users/pages/users-list/users-list/users-list.component';
import { InsertUserComponent } from './users/pages/insert-user/insert-user/insert-user.component';
import { PostsListComponent } from './posts/pages/posts-list/posts-list/posts-list.component';
import { InsertPostComponent } from './posts/pages/insert-post/insert-post/insert-post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './Gurads/auth.guard';
import { OrdersListComponent } from './orders/pages/orders-list/orders-list/orders-list.component';
import { InsertOrderComponent } from './orders/pages/insert-order/insert-order/insert-order.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },

    {
      path: '',
      component: MainLayoutComponent,
      canActivate:[authGuard],
      children: [
        { path: 'dashboard', component: DashboardComponent },

        { path: 'products', component: ProductsListComponent },
        { path: 'products/insert', component: InsertProductComponent },

        { path: 'categories', component: CategoriesListComponent },
        { path: 'categories/insert', component: InsertCategoryComponent },

        { path: 'subcategories', component: SubcategoriesListComponent },
        { path: 'subcategories/insert', component: InsertSubcategoryComponent },

        { path: 'orders' , component:OrdersListComponent},
        { path: 'orders/insert', component:InsertOrderComponent},

        { path: 'users', component: UsersListComponent },
        { path: 'users/insert', component: InsertUserComponent },

        { path: 'posts', component: PostsListComponent },
        { path: 'posts/insert', component: InsertPostComponent },

        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
      ]
    },

    { path: '**', component: NotFoundComponent }
  ];


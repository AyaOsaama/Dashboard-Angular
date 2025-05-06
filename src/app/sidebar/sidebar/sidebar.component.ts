import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge'; 
import { AvatarModule } from 'primeng/avatar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [MenuModule,CommonModule,RippleModule,BadgeModule,AvatarModule,PanelMenuModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user:any;
  isSidebarOpen = true;
  items = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: ['/dashboard']
    },
    {
      label: 'Products',
      icon: 'pi pi-box',
      items: [
        { label: 'List', icon: 'pi pi-list', routerLink: ['/products'] },
        { label: 'Insert', icon: 'pi pi-plus', routerLink: ['/products/insert'] }
      ]
    },
    {
      label: 'Categories',
      icon: 'pi pi-tags',
      items: [
        { label: 'List', icon: 'pi pi-list', routerLink: ['/categories'] },
        { label: 'Insert', icon: 'pi pi-plus', routerLink: ['/categories/insert'] }
      ]
    },
    {
      label: 'Subcategories',
      icon: 'pi pi-tag',
      items: [
        { label: 'List', icon: 'pi pi-list', routerLink: ['/subcategories'] },
        { label: 'Insert', icon: 'pi pi-plus', routerLink: ['/subcategories/insert'] }
      ]
    },
    {
      label: 'Orders',
      icon: 'pi pi-shopping-cart',
      items: [
        { label: 'List', icon: 'pi pi-list', routerLink: ['/orders'] },
        { label: 'Insert', icon: 'pi pi-plus', routerLink: ['/orders/insert'] }
      ]
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      items: [
        { label: 'List', icon: 'pi pi-list', routerLink: ['/users'] },
        { label: 'Insert', icon: 'pi pi-plus', routerLink: ['/users/insert'] }
      ]
    },
    {
      label: 'Posts',
      icon: 'pi pi-pencil',
      items: [
        { label: 'List', icon: 'pi pi-list', routerLink: ['/posts'] },
        { label: 'Insert', icon: 'pi pi-plus', routerLink: ['/posts/insert'] }
      ]
    }
  ];
  userName!: String;
  userImage !:String;
  ngOnInit() {
    const userString = localStorage.getItem("user");
  
    if (userString) {
      const user = JSON.parse(userString);
      this.userName = user.name;
      this.userImage = user.imageUrl;
    } else {
      console.warn("لم يتم العثور على بيانات المستخدم في localStorage");
      // this.router.navigate(['/login']);
    }
  }
  

}

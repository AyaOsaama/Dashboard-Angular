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
  userName!: string;
  userImage!: string;
  userRole!: string;
  user: any;
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
  
  ngOnInit() {
    const userBackStr = localStorage.getItem("user");
    if (userBackStr && userBackStr !== "undefined") {
      try {
        this.user = JSON.parse(userBackStr);
        console.log("User loaded:", this.user);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    } else {
      console.warn("No user data found in localStorage");
    }
  }  

}

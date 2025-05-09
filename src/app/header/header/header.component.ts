import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-header',
  imports: [ToolbarModule, AvatarModule, ButtonModule, SplitButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: any;
  newMenuItems = [
    {
      label: 'Product',
      icon: 'pi pi-box',
      routerLink: ['/products/insert'],
    },
    {
      label: 'Category',
      icon: 'pi pi-tags',
      routerLink: ['/categories/insert'],
    },
    {
      label: 'Subcategory',
      icon: 'pi pi-tag',
      routerLink: ['/subcategories/insert'],
    },
    {
      label: 'User',
      icon: 'pi pi-user',
      routerLink: ['/users/insert'],
    },
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

  toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }
}

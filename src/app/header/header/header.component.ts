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
    {
      label: 'Order',
      icon: 'pi pi-shopping-cart',
      routerLink: ['/orders/insert'],
    },
  ];

  toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }
}

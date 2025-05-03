import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsListComponent } from "./products/pages/products-list/products-list/products-list.component";

// import { RouterOutlet } from '@angular/router';
// import { TableModule } from 'primeng/table';
// import { TagModule } from 'primeng/tag';
// import { RatingModule } from 'primeng/rating';
// import { CommonModule } from '@angular/common';
// import { ButtonModule } from 'primeng/button';
// import { FormsModule } from '@angular/forms';
// import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Dashboard';


}

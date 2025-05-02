import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    TableModule,
    TagModule,
    RatingModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    CarouselModule,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Dashboard';
}

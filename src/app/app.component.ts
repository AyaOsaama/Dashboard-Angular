import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoading: any; 

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.isLoading = this.loaderService.isLoading;
  }


  title = 'Dashboard';

}

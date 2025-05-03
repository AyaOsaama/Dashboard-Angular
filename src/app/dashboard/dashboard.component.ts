import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      { label: 'Sales', data: [65, 59, 80, 81], backgroundColor: '#4CAF50' }
    ]
  };

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
  };
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Sofas', 'Tables', 'Chairs', 'Beds'],
    datasets: [
      {
        label: 'Top Categories',
        data: [120, 90, 70, 50],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A']
      }
    ]
  };
}

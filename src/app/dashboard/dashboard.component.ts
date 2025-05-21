import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { DashboardService } from './service/dashboard.service';
import { forkJoin } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { CardModule } from 'primeng/card';
import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview'; 


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule,CardModule,TabViewModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  monthlySalesData: any;
  monthlySalesOptions: any;

  orderStatusData: any;
  orderStatusOptions: any;

  topProductsData: any;
  topProductsOptions: any;

  totalCartValueData: any;
  totalCartValueOptions: any;
  usersWithCartItemsData: any;
  usersWithCartItemsOptions: any;
  totalCartItemsData: any;
  totalCartItemsOptions: any;

  totalRatingsData: any;
  totalRatingsOptions: any;
  averageRatingData: any;
  averageRatingOptions: any;
  ratingDistributionData: any;
  ratingDistributionOptions: any;
  ratingsWithCommentsData: any;
  mostRatedProductsData: any;
  mostRatedProductsOptions: any;
  ratingKPIs!: { total: number; average: string };
topRatedProducts: any[] = [];


  constructor(private dashboardService: DashboardService ,  private cdRef: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.loadMonthlySales();
    this.loadOrderStatusStats();
    this.loadTopProductsInCart();
    this.loadTotalCartItems();
    this.loadTotalCartValue();
    this.loadUsersWithCartItems();
    this.loadRatingStats();
  }

  getMonthName(monthNumber: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1] || 'Unknown';
  }

  getChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color') || '#495057';
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary') || '#6c757d';
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#dcdcdc';

    return {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }
  getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

  loadMonthlySales() {
    this.dashboardService.getMonthlySales().subscribe({
      next: (res) => {
        const salesData = res.monthlySales;
        const labels = salesData.map((item: any) => this.getMonthName(item._id));
        const data = salesData.map((item: any) => item.totalSales);

        this.monthlySalesData = {
          labels: labels,
          datasets: [
            {
              label: 'Total Sales',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              fill: false,
              tension: 0.4
            }
          ]
        };
        this.monthlySalesOptions = this.getChartOptions();
      },
      error: (err) => console.error(err)
    });
  }

  loadOrderStatusStats() {
    this.dashboardService.getOrderStatusStats().subscribe({
      next: (res) => {
        const stats = res.orderStatusStats;
        const labels = stats.map((item: any) => item._id);
        const data = stats.map((item: any) => item.count);

        const backgroundColors = labels.map((label: string) => {
          switch (label) {
            case 'pending': return 'rgba(255, 205, 86, 0.6)';
            case 'shipped': return 'rgba(54, 162, 235, 0.6)';
            case 'delivered': return 'rgba(134, 241, 186, 0.6)';
            case 'cancelled': return 'rgba(255, 99, 132, 0.6)';
            default: return 'rgba(201, 203, 207, 0.6)';
          }
        });

        const borderColors = labels.map((label: string) => {
          switch (label) {
            case 'pending': return 'rgba(255, 205, 86, 1)';
            case 'shipped': return 'rgba(54, 162, 235, 1)';
            case 'delivered': return 'rgba(75, 192, 192, 1)';
            case 'cancelled': return 'rgba(255, 99, 132, 1)';
            default: return 'rgba(201, 203, 207, 1)';
          }
        });

        this.orderStatusData = {
          labels: labels,
          datasets: [
            {
              label: 'Order Count',
              data: data,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1
            }
          ]
        };
        this.orderStatusOptions = this.getChartOptions();
      },
      error: (err) => console.error(err)
    });
  }

loadTopProductsInCart() {
  this.dashboardService.getTopProductsInCart().subscribe({
    next: (res) => {
      console.log('====================================');
      console.log(`load Top Product`, res.topProducts);
      console.log('====================================');

      const allTopProducts = res.topProducts;
      const labels = allTopProducts.map((item: any) => item.name);
      const data = allTopProducts.map((item: any) => item.totalQuantity);
      const backgroundColors = labels.map(() => this.getRandomColor());

      this.topProductsData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors,
            hoverBackgroundColor: backgroundColors
          }
        ]
      };

     this.topProductsOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    }
  },
  scales: {
    x: {
      display: false
    },
    y: {
      display: true 
    }
  }
};


      this.cdRef.detectChanges();
    },
    error: (err) => console.error(err),
  });
}



  loadTotalCartItems() {
    this.dashboardService.getTotalCartItems().subscribe({
      next: (res) => {
        this.totalCartItemsData = {
  labels: ['Cart Items', 'Remaining'],
  datasets: [
    {
      label: 'Cart Distribution',
      data: [res.totalItems, 1000 - res.totalItems], 
      backgroundColor: ['#FFCE56', '#E0E0E0']
    }
  ]
};
 },
      error: (err) => console.error(err)
    });
  }

  loadTotalCartValue() {
    this.dashboardService.getTotalCartValue().subscribe({
      next: (res) => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
 this.totalCartValueData = {
  labels: ['Total Cart Value'],
  datasets: [
    {
      data: [res.totalValue, 100 - res.totalValue], 
      backgroundColor: ['#4BC0C0', '#E0E0E0'],
      hoverBackgroundColor: ['#4BC0C0', '#E0E0E0']
    }
  ]
};

this.totalCartValueOptions = {
  cutout: '70%', 
  plugins: {
    legend: {
      display: false
    }
  }
};


this.totalCartValueOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

        this.totalCartValueOptions = this.getChartOptions();
      },
      error: (err) => console.error(err)
    });
  }

loadUsersWithCartItems() {
  forkJoin({
    usersWithItems: this.dashboardService.getUsersWithCartItems(),
    totalUsers: this.dashboardService.getAllUsersCount()
  }).subscribe({
    next: ({ usersWithItems, totalUsers }) => {
      console.log('Users with cart items:', usersWithItems);
      console.log('Total users:', totalUsers);

      const withItems = usersWithItems.userCount;
      const withoutItems = totalUsers.totalUsers - withItems;

      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.usersWithCartItemsData = {
        labels: ['With cart items', 'Without cart items'],
        datasets: [
          {
            data: [withItems, withoutItems],
            backgroundColor: [
              documentStyle.getPropertyValue('--p-cyan-500'),
              documentStyle.getPropertyValue('--p-pink-500')
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--p-cyan-400'),
              documentStyle.getPropertyValue('--p-pink-400')
            ]
          }
        ]
      };

      this.usersWithCartItemsOptions = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
    },
    error: (err) => console.error('Error loading user cart data:', err)
  });
}




 loadRatingStats() {
  forkJoin({
    totalRatings: this.dashboardService.getTotalRatings(),
    averageRating: this.dashboardService.getAverageRating(),
    ratingDistribution: this.dashboardService.getRatingDistribution(),
    mostRatedProducts: this.dashboardService.getMostRatedProducts()
  }).subscribe(({ totalRatings, averageRating, ratingDistribution, mostRatedProducts }) => {
    this.ratingKPIs = {
      total: totalRatings.totalRatings,
      average: averageRating.averageRating.toFixed(2)
    };

    this.ratingDistributionData = {
      labels: ratingDistribution.map((r: any) => `${r._id} ★`),
      datasets: [{
        data: ratingDistribution.map((r: any) => r.count),
        backgroundColor: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB']
      }]
    };

    this.ratingDistributionOptions = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true
          }
        }
      }
    };

    this.topRatedProducts = mostRatedProducts; // لعرضهم في جدول أو قائمة
  });
}

}
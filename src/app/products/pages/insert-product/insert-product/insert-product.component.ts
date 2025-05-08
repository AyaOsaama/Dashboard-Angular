import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputNumber } from 'primeng/inputnumber';
import { Fluid } from 'primeng/fluid';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';

interface Category {
  name: string;
}

@Component({
  selector: 'app-insert-product',
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    InputNumber,
    Fluid,
    FloatLabelModule,
    FormsModule,
    TextareaModule,
    FloatLabel
  ],
  templateUrl: './insert-product.component.html',
  styleUrl: './insert-product.component.css'
})
export class InsertProductComponent {
  value1: number = 20;

  value2: number = 10.5;

  value3: number = 25;
  text1: string | undefined;

  text2: string | undefined;

  number: string | undefined;

  selectedCategory: Category | undefined;

  cities: Category[] = [
    { name: 'New York' },
    { name: 'Rome' },
    { name: 'London' },
    { name: 'Istanbul' },
    { name: 'Paris' },
  ];

}

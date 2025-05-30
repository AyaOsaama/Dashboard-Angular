import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductControlComponent } from './product-control.component';

describe('ProductControlComponent', () => {
  let component: ProductControlComponent;
  let fixture: ComponentFixture<ProductControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

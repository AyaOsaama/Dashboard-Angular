import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertProductComponent } from './insert-product.component';

describe('InsertProductComponent', () => {
  let component: InsertProductComponent;
  let fixture: ComponentFixture<InsertProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

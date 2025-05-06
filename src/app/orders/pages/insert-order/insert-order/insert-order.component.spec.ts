import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertOrderComponent } from './insert-order.component';

describe('InsertOrderComponent', () => {
  let component: InsertOrderComponent;
  let fixture: ComponentFixture<InsertOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

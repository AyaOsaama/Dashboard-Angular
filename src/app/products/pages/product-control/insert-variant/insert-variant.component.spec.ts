import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertVariantComponent } from './insert-variant.component';

describe('InsertVariantComponent', () => {
  let component: InsertVariantComponent;
  let fixture: ComponentFixture<InsertVariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertVariantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

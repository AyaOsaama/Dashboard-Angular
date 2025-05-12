import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSubcategoryComponent } from './insert-subcategory.component';

describe('InsertSubcategoryComponent', () => {
  let component: InsertSubcategoryComponent;
  let fixture: ComponentFixture<InsertSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertSubcategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

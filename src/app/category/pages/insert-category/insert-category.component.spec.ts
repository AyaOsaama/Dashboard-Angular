import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCategoryComponent } from './insert-category.component';

describe('InsertCategoryComponent', () => {
  let component: InsertCategoryComponent;
  let fixture: ComponentFixture<InsertCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

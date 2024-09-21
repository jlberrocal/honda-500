import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFieldComponent } from './product-field.component';

describe('ProductFieldComponent', () => {
  let component: ProductFieldComponent;
  let fixture: ComponentFixture<ProductFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

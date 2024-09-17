import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPurchaseModalComponent } from './add-purchase-modal.component';

describe('AddPurchaseModalComponent', () => {
  let component: AddPurchaseModalComponent;
  let fixture: ComponentFixture<AddPurchaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPurchaseModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPurchaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

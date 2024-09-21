import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NonMemberPurchaseComponent } from './non-member-purchase.component';

describe('NonMemberPurchaseComponent', () => {
  let component: NonMemberPurchaseComponent;
  let fixture: ComponentFixture<NonMemberPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonMemberPurchaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NonMemberPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

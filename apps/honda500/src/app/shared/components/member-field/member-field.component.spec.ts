import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberFieldComponent } from './member-field.component';

describe('MemberFieldComponent', () => {
  let component: MemberFieldComponent;
  let fixture: ComponentFixture<MemberFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

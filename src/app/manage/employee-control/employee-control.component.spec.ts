import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeControlComponent } from './employee-control.component';

describe('EmployeeControlComponent', () => {
  let component: EmployeeControlComponent;
  let fixture: ComponentFixture<EmployeeControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

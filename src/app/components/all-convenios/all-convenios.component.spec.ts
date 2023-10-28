import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllConveniosComponent } from './all-convenios.component';

describe('AllConveniosComponent', () => {
  let component: AllConveniosComponent;
  let fixture: ComponentFixture<AllConveniosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllConveniosComponent]
    });
    fixture = TestBed.createComponent(AllConveniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

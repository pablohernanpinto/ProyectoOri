import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnidadGestoraComponent } from './add-unidad-gestora.component';

describe('AddUnidadGestoraComponent', () => {
  let component: AddUnidadGestoraComponent;
  let fixture: ComponentFixture<AddUnidadGestoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUnidadGestoraComponent]
    });
    fixture = TestBed.createComponent(AddUnidadGestoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

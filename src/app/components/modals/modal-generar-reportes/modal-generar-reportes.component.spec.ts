import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGenerarReportesComponent } from './modal-generar-reportes.component';

describe('ModalGenerarReportesComponent', () => {
  let component: ModalGenerarReportesComponent;
  let fixture: ComponentFixture<ModalGenerarReportesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalGenerarReportesComponent]
    });
    fixture = TestBed.createComponent(ModalGenerarReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

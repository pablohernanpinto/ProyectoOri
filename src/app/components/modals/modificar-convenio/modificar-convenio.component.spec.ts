import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarConvenioComponent } from './modificar-convenio.component';

describe('ModificarConvenioComponent', () => {
  let component: ModificarConvenioComponent;
  let fixture: ComponentFixture<ModificarConvenioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarConvenioComponent]
    });
    fixture = TestBed.createComponent(ModificarConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

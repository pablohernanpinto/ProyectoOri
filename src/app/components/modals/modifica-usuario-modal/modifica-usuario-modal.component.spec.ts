import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaUsuarioModalComponent } from './modifica-usuario-modal.component';

describe('ModificaUsuarioModalComponent', () => {
  let component: ModificaUsuarioModalComponent;
  let fixture: ComponentFixture<ModificaUsuarioModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificaUsuarioModalComponent]
    });
    fixture = TestBed.createComponent(ModificaUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

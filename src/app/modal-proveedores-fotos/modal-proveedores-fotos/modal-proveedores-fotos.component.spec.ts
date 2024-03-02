import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProveedoresFotosComponent } from './modal-proveedores-fotos.component';

describe('ModalProveedoresFotosComponent', () => {
  let component: ModalProveedoresFotosComponent;
  let fixture: ComponentFixture<ModalProveedoresFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalProveedoresFotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalProveedoresFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

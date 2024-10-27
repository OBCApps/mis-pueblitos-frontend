import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospedajesListComponent } from './hospedajes-list.component';

describe('HospedajesListComponent', () => {
  let component: HospedajesListComponent;
  let fixture: ComponentFixture<HospedajesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospedajesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HospedajesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

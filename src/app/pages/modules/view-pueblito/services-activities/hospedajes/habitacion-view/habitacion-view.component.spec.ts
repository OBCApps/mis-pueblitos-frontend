import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacionViewComponent } from './habitacion-view.component';

describe('HabitacionViewComponent', () => {
  let component: HabitacionViewComponent;
  let fixture: ComponentFixture<HabitacionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitacionViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitacionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

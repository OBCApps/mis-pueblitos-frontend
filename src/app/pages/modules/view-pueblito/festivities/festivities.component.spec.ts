import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivitiesComponent } from './festivities.component';

describe('FestivitiesComponent', () => {
  let component: FestivitiesComponent;
  let fixture: ComponentFixture<FestivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FestivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

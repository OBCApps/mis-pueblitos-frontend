import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtractivosTuristicosComponent } from './atractivos-turisticos.component';

describe('AtractivosTuristicosComponent', () => {
  let component: AtractivosTuristicosComponent;
  let fixture: ComponentFixture<AtractivosTuristicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtractivosTuristicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtractivosTuristicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

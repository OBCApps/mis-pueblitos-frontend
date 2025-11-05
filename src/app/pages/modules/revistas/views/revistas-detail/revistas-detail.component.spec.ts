import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevistasDetailComponent } from './revistas-detail.component';

describe('RevistasDetailComponent', () => {
  let component: RevistasDetailComponent;
  let fixture: ComponentFixture<RevistasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevistasDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevistasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevistasListComponent } from './revistas-list.component';

describe('RevistasListComponent', () => {
  let component: RevistasListComponent;
  let fixture: ComponentFixture<RevistasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevistasListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevistasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

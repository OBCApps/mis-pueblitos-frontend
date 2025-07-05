import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBlogTuristicoComponent } from './manage-blog-turistico.component';

describe('ManageBlogTuristicoComponent', () => {
  let component: ManageBlogTuristicoComponent;
  let fixture: ComponentFixture<ManageBlogTuristicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBlogTuristicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageBlogTuristicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

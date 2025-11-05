import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftImageComponent } from './left-image.component';

describe('LeftImageComponent', () => {
  let component: LeftImageComponent;
  let fixture: ComponentFixture<LeftImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeftImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeftImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBlogTuristicoComponent } from './list-blog-turistico.component';

describe('ListBlogTuristicoComponent', () => {
  let component: ListBlogTuristicoComponent;
  let fixture: ComponentFixture<ListBlogTuristicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBlogTuristicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBlogTuristicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

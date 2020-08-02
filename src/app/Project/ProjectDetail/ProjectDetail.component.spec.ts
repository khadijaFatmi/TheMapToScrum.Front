import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectdetailComponent } from './ProjectDetail.component';

describe('ProjetusdetailComponent', () => {
  let component: ProjectdetailComponent;
  let fixture: ComponentFixture<ProjectdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

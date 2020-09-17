import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrumdefinitionComponent } from './scrumdefinition.component';

describe('ScrumdefinitionComponent', () => {
  let component: ScrumdefinitionComponent;
  let fixture: ComponentFixture<ScrumdefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrumdefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrumdefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

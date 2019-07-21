import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizableMatGridComponent } from './resizable-mat-grid.component';

describe('ResizableMatGridComponent', () => {
  let component: ResizableMatGridComponent;
  let fixture: ComponentFixture<ResizableMatGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResizableMatGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizableMatGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

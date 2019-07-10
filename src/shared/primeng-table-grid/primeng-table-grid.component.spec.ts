import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimengTableGridComponent } from './primeng-table-grid.component';

describe('PrimengTableGridComponent', () => {
  let component: PrimengTableGridComponent;
  let fixture: ComponentFixture<PrimengTableGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimengTableGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimengTableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

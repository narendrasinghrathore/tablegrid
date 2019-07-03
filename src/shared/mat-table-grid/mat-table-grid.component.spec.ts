import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableGridComponent } from './mat-table-grid.component';

describe('MatTableGridComponent', () => {
  let component: MatTableGridComponent;
  let fixture: ComponentFixture<MatTableGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatTableGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

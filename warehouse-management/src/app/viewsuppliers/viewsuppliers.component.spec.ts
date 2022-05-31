import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsuppliersComponent } from './viewsuppliers.component';

describe('ViewsuppliersComponent', () => {
  let component: ViewsuppliersComponent;
  let fixture: ComponentFixture<ViewsuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsuppliersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

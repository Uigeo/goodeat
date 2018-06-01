import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfoodTableComponent } from './myfood-table.component';

describe('MyfoodTableComponent', () => {
  let component: MyfoodTableComponent;
  let fixture: ComponentFixture<MyfoodTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfoodTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfoodTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

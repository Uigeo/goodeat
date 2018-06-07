import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LankTableComponent } from './lank-table.component';

describe('LankTableComponent', () => {
  let component: LankTableComponent;
  let fixture: ComponentFixture<LankTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LankTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LankTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InheaderComponent } from './inheader.component';

describe('InheaderComponent', () => {
  let component: InheaderComponent;
  let fixture: ComponentFixture<InheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

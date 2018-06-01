import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleSettingComponent } from './battle-setting.component';

describe('BattleSettingComponent', () => {
  let component: BattleSettingComponent;
  let fixture: ComponentFixture<BattleSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

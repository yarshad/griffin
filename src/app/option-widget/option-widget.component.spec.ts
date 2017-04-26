import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionWidgetComponent } from './option-widget.component';

describe('OptionWidgetComponent', () => {
  let component: OptionWidgetComponent;
  let fixture: ComponentFixture<OptionWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

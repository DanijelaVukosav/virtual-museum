import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuzejContainerComponent } from './muzej-container.component';

describe('MuzejContainerComponent', () => {
  let component: MuzejContainerComponent;
  let fixture: ComponentFixture<MuzejContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuzejContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuzejContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

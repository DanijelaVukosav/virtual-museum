import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuzejEditComponent } from './muzej-edit.component';

describe('MuzejEditComponent', () => {
  let component: MuzejEditComponent;
  let fixture: ComponentFixture<MuzejEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuzejEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuzejEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

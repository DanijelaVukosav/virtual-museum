import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuzejDetailsComponent } from './muzej-details.component';

describe('MuzejDetailsComponent', () => {
  let component: MuzejDetailsComponent;
  let fixture: ComponentFixture<MuzejDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuzejDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuzejDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

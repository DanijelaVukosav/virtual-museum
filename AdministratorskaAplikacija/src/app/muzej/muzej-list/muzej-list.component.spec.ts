import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuzejListComponent } from './muzej-list.component';

describe('MuzejListComponent', () => {
  let component: MuzejListComponent;
  let fixture: ComponentFixture<MuzejListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuzejListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuzejListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosjeteListComponent } from './posjete-list.component';

describe('PosjeteListComponent', () => {
  let component: PosjeteListComponent;
  let fixture: ComponentFixture<PosjeteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosjeteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosjeteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

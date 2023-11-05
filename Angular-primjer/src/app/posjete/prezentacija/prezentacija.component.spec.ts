import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrezentacijaComponent } from './prezentacija.component';

describe('PrezentacijaComponent', () => {
  let component: PrezentacijaComponent;
  let fixture: ComponentFixture<PrezentacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrezentacijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrezentacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

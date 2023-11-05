import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PristupAdministratorimaComponent } from './pristup-administratorima.component';

describe('PristupAdministratorimaComponent', () => {
  let component: PristupAdministratorimaComponent;
  let fixture: ComponentFixture<PristupAdministratorimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PristupAdministratorimaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PristupAdministratorimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosjeteKorisnikaComponent } from './posjete-korisnika.component';

describe('PosjeteKorisnikaComponent', () => {
  let component: PosjeteKorisnikaComponent;
  let fixture: ComponentFixture<PosjeteKorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosjeteKorisnikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosjeteKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

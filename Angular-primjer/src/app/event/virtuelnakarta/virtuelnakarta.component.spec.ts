import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtuelnakartaComponent } from './virtuelnakarta.component';

describe('VirtuelnakartaComponent', () => {
  let component: VirtuelnakartaComponent;
  let fixture: ComponentFixture<VirtuelnakartaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtuelnakartaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtuelnakartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

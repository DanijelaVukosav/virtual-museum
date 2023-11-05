import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtuelnaPosjetaComponent } from './virtuelna-posjeta.component';

describe('VirtuelnaPosjetaComponent', () => {
  let component: VirtuelnaPosjetaComponent;
  let fixture: ComponentFixture<VirtuelnaPosjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtuelnaPosjetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtuelnaPosjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

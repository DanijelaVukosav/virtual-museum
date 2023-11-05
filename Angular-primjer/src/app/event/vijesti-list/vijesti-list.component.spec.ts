import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VijestiListComponent } from './vijesti-list.component';

describe('VijestiListComponent', () => {
  let component: VijestiListComponent;
  let fixture: ComponentFixture<VijestiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VijestiListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VijestiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

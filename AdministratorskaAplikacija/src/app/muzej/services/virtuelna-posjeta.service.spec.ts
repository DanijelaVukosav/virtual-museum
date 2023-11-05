import { TestBed } from '@angular/core/testing';

import { VirtuelnaPosjetaService } from './virtuelna-posjeta.service';

describe('VirtuelnaPosjetaService', () => {
  let service: VirtuelnaPosjetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtuelnaPosjetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

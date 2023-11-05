import { TestBed } from '@angular/core/testing';

import { MuzejServiceService } from './muzej-service.service';

describe('MuzejServiceService', () => {
  let service: MuzejServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuzejServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

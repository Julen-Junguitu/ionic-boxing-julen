import { TestBed } from '@angular/core/testing';

import { FighterdbserviceService } from './fighterdbservice.service';

describe('FighterdbserviceService', () => {
  let service: FighterdbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FighterdbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

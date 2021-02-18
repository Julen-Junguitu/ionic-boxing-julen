import { TestBed } from '@angular/core/testing';

import { FightercrudService } from './fightercrud.service';

describe('FightercrudService', () => {
  let service: FightercrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FightercrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

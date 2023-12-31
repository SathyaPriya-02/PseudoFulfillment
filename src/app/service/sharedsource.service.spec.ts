import { TestBed } from '@angular/core/testing';

import { SharedsourceService } from './sharedsource.service';

describe('SharedsourceService', () => {
  let service: SharedsourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedsourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

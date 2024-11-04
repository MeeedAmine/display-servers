import { TestBed } from '@angular/core/testing';

import { LoadDataServiceService } from './load-data-service.service';

describe('LoadDataServiceService', () => {
  let service: LoadDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

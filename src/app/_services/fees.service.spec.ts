/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeesService } from './fees.service';

describe('Service: Fees', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeesService]
    });
  });

  it('should ...', inject([FeesService], (service: FeesService) => {
    expect(service).toBeTruthy();
  }));
});

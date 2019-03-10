/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssetTypeService } from './asset-type.service';

describe('Service: AssetType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetTypeService]
    });
  });

  it('should ...', inject([AssetTypeService], (service: AssetTypeService) => {
    expect(service).toBeTruthy();
  }));
});

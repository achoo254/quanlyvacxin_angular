/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegimenDetailsService } from './RegimenDetails.service';

describe('Service: RegimenDetails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegimenDetailsService]
    });
  });

  it('should ...', inject([RegimenDetailsService], (service: RegimenDetailsService) => {
    expect(service).toBeTruthy();
  }));
});

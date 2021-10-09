/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductDetailsService } from './ProductDetails.service';

describe('Service: ProductDetails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductDetailsService]
    });
  });

  it('should ...', inject([ProductDetailsService], (service: ProductDetailsService) => {
    expect(service).toBeTruthy();
  }));
});

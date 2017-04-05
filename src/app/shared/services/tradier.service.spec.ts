import { TestBed, inject } from '@angular/core/testing';

import { TradierService } from './tradier.service';

describe('TradierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradierService]
    });
  });

  it('should ...', inject([TradierService], (service: TradierService) => {
    expect(service).toBeTruthy();
  }));
});

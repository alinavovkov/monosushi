import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductInfoResolver } from './product-info.resolver';

describe('ProductInfoResolver', () => {
  let resolver: ProductInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductInfoResolver]
    });

    resolver = TestBed.inject(ProductInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

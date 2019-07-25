import { SafePipe } from './safe.pipe';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

describe('SafePipe', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      DomSanitizer
    ]
  }));
  it('create an instance', () => {
    const pipe: SafePipe = TestBed.get(SafePipe);
    expect(pipe).toBeTruthy();
  });
});

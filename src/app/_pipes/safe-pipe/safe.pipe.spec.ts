import { SafePipe } from './safe.pipe';
import { TestBed, inject } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

describe('SafePipe', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SafePipe
    ]
  }));
  it('create an instance', inject([DomSanitizer, SafePipe], (pipe: SafePipe) => {
    expect(pipe).toBeTruthy();
  }));
});

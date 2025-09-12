import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Varieties } from './varieties';

describe('Varieties', () => {
  let component: Varieties;
  let fixture: ComponentFixture<Varieties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Varieties]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Varieties);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

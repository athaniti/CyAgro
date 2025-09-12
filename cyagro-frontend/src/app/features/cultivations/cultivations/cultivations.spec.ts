import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cultivations } from './cultivations';

describe('Cultivations', () => {
  let component: Cultivations;
  let fixture: ComponentFixture<Cultivations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cultivations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cultivations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarmfulCauses } from './harmful-causes';

describe('HarmfulCauses', () => {
  let component: HarmfulCauses;
  let fixture: ComponentFixture<HarmfulCauses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarmfulCauses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarmfulCauses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

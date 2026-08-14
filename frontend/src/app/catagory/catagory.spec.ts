import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Catagory } from './catagory';

describe('Catagory', () => {
  let component: Catagory;
  let fixture: ComponentFixture<Catagory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catagory],
    }).compileComponents();

    fixture = TestBed.createComponent(Catagory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

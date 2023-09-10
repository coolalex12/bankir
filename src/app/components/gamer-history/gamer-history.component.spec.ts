import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamerHistoryComponent } from './gamer-history.component';

describe('GamerHistoryComponent', () => {
  let component: GamerHistoryComponent;
  let fixture: ComponentFixture<GamerHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamerHistoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

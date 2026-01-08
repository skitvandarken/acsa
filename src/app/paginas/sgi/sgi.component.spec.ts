import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgiComponent } from './sgi.component';

describe('SgiComponent', () => {
  let component: SgiComponent;
  let fixture: ComponentFixture<SgiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

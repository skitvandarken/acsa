import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiComponent } from './anti.component';

describe('AntiComponent', () => {
  let component: AntiComponent;
  let fixture: ComponentFixture<AntiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

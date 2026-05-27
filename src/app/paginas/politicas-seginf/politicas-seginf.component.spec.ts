import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasSeginfComponent } from './politicas-seginf.component';

describe('PoliticasSeginfComponent', () => {
  let component: PoliticasSeginfComponent;
  let fixture: ComponentFixture<PoliticasSeginfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticasSeginfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticasSeginfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

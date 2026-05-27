import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasContratComponent } from './politicas-contrat.component';

describe('PoliticasContratComponent', () => {
  let component: PoliticasContratComponent;
  let fixture: ComponentFixture<PoliticasContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticasContratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticasContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

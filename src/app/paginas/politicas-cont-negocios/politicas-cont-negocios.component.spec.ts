import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasContNegociosComponent } from './politicas-cont-negocios.component';

describe('PoliticasContNegociosComponent', () => {
  let component: PoliticasContNegociosComponent;
  let fixture: ComponentFixture<PoliticasContNegociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticasContNegociosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticasContNegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

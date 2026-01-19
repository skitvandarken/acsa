import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasCookiesComponent } from './politicas-cookies.component';

describe('PoliticasCookiesComponent', () => {
  let component: PoliticasCookiesComponent;
  let fixture: ComponentFixture<PoliticasCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticasCookiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticasCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

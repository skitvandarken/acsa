import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasIdDuediligenceComponent } from './politicas-id-duediligence.component';

describe('PoliticasIdDuediligenceComponent', () => {
  let component: PoliticasIdDuediligenceComponent;
  let fixture: ComponentFixture<PoliticasIdDuediligenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticasIdDuediligenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticasIdDuediligenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

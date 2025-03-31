import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperacionCodigoComponent } from './recuperacion-codigo.component';

describe('RecuperacionCodigoComponent', () => {
  let component: RecuperacionCodigoComponent;
  let fixture: ComponentFixture<RecuperacionCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperacionCodigoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperacionCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

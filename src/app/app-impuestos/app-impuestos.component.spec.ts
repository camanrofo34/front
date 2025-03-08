import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppImpuestosComponent } from './app-impuestos.component';

describe('AppImpuestosComponent', () => {
  let component: AppImpuestosComponent;
  let fixture: ComponentFixture<AppImpuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppImpuestosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

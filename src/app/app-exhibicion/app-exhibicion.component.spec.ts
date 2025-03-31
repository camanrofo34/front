import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExhibicionComponent } from './app-exhibicion.component';

describe('AppExhibicionComponent', () => {
  let component: AppExhibicionComponent;
  let fixture: ComponentFixture<AppExhibicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppExhibicionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppExhibicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

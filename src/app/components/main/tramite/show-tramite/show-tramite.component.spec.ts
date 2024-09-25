import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTramiteComponent } from './show-tramite.component';

describe('ShowTramiteComponent', () => {
  let component: ShowTramiteComponent;
  let fixture: ComponentFixture<ShowTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowTramiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

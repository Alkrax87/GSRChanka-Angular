import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTramiteComponent } from './create-tramite.component';

describe('CreateTramiteComponent', () => {
  let component: CreateTramiteComponent;
  let fixture: ComponentFixture<CreateTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTramiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

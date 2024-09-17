import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProyectComponent } from './editar-proyect.component';

describe('EditarProyectComponent', () => {
  let component: EditarProyectComponent;
  let fixture: ComponentFixture<EditarProyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarProyectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

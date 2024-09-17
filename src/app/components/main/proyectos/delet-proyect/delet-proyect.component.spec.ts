import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletProyectComponent } from './delet-proyect.component';

describe('DeletProyectComponent', () => {
  let component: DeletProyectComponent;
  let fixture: ComponentFixture<DeletProyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletProyectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

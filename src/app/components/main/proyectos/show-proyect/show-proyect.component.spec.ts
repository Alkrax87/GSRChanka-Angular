import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProyectComponent } from './show-proyect.component';

describe('ShowProyectComponent', () => {
  let component: ShowProyectComponent;
  let fixture: ComponentFixture<ShowProyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowProyectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

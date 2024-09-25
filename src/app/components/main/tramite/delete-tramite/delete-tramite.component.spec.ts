import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTramiteComponent } from './delete-tramite.component';

describe('DeleteTramiteComponent', () => {
  let component: DeleteTramiteComponent;
  let fixture: ComponentFixture<DeleteTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTramiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

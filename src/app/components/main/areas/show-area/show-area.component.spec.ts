import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAreaComponent } from './show-area.component';

describe('ShowAreaComponent', () => {
  let component: ShowAreaComponent;
  let fixture: ComponentFixture<ShowAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

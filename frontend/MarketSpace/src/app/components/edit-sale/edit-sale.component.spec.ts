import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaleComponent } from './edit-sale.component';

describe('EditSaleComponent', () => {
  let component: EditSaleComponent;
  let fixture: ComponentFixture<EditSaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSaleComponent]
    });
    fixture = TestBed.createComponent(EditSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

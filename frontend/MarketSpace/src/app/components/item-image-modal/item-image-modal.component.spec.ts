import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemImageModalComponent } from './item-image-modal.component';

describe('ItemImageModalComponent', () => {
  let component: ItemImageModalComponent;
  let fixture: ComponentFixture<ItemImageModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemImageModalComponent]
    });
    fixture = TestBed.createComponent(ItemImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

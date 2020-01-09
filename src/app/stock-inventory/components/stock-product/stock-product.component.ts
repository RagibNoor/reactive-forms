import {Component, Input , Output, EventEmitter} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {Product} from '../../models/product.interface';

@Component({
  selector: 'app-stock-product',
  styleUrls: ['stock-product.component.scss'],
  templateUrl: 'stock-product.component.html',
})
export class StockProductComponent {
  @Input()
  parent: FormGroup;

  @Output()
  removed = new EventEmitter<any>();
  @Input()
  mapProduct: Map<number, Product>;
  get stocks() {
    return (this.parent.get('stock') as FormArray).controls;
  }
  getProduct(id) {
    return this.mapProduct.get(id);
  }
  onRemove(group, index) {
  this.removed.emit({group, index});
  }
}

import {Component, Input, Output , EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Product} from '../../models/product.interface';

@Component({
  selector: 'app-stock-selector',
  styleUrls: ['stock-selector.component.scss'],
  templateUrl: 'stock-selector.component.html',

})
export class StockSelectorComponent {
  @Input()
  parent: FormGroup;

  @Input()
  products: Product[];
  @Output()
  added =  new EventEmitter<any>();
  public onAdd() {
  this.added.emit(this.parent.get('selector').value);
  this.parent.get('selector').reset({
    product_id: '',
    quantity: 0
  });
  }
}

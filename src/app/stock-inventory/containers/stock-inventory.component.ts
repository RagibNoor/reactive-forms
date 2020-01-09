import {Component, OnInit} from '@angular/core';
import {FormControl, FormArray, FormGroup, FormBuilder} from '@angular/forms';
import {Product} from '../models/product.interface';
import {Observable} from 'rxjs';
import {forkJoin} from 'rxjs';
import {StockInventoryService} from '../service/stock-inventory.service';
import {CartItem} from '../models/cartItem.interface';

@Component({
  selector: 'app-stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  templateUrl: 'stock-inventory.component.html'
})

export class StockInventoryComponent implements OnInit {
  products: Product[];
  total: number;
  form = this.fb.group({
    store: this.fb.group({
      branch: '',
      code: ''
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
  });

  productMap: Map<number, Product>;

  constructor(private fb: FormBuilder,
              private stockService: StockInventoryService) {
  }

  ngOnInit(): void {
    const cart = this.stockService.getCartItem();
    const product = this.stockService.getProducts();
    forkJoin(cart, product)
      .subscribe(([carts, products]: [CartItem[], Product[]]) => {
        const myMap = products
          .map<[number, Product]>((x: Product) => [x.id, x]);
        this.productMap = new Map<number, Product>(myMap);
        this.products = products;
        carts.forEach(item => this.addStock(item));
        console.log(myMap);
        this.calculateTotal(this.form.get('stock').value);
        this.form.get('stock').valueChanges.subscribe(value => this.calculateTotal(value));
      });
  }

  public addStock(stock: CartItem) {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  public createStock(stock) {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 2
    });
  }

  public removedStock({group, index}) {
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }

  onSubmit() {
    console.log('Submit :', this.form.value);
  }

  calculateTotal(value: CartItem[]) {
    const total = value.reduce((prev, next) => {
      return prev + (next.quantity * this.productMap.get(next.product_id).price);
    }, 0);
    this.total = total;
  }

}

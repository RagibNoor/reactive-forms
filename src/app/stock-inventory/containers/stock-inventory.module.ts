import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { StockInventoryComponent } from './stock-inventory.component';
import {StockBranchComponent} from '../components/stock-branch/stock-branch.component';
import {StockProductComponent} from '../components/stock-product/stock-product.component';
import {StockSelectorComponent} from '../components/stock-selector/stock-selector.component';
import {HttpClientModule} from '@angular/common/http';
import {StockInventoryService} from '../service/stock-inventory.service';
import {StockCounterComponent} from '../components/stock-counter/stock-counter.component';

@NgModule({
  declarations: [StockInventoryComponent,
  StockBranchComponent,
  StockProductComponent,
  StockSelectorComponent,
    StockCounterComponent],
  exports: [
    StockInventoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    StockInventoryService
  ]
})

export class StockInventoryModule {}

import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-stock-branch',
  styleUrls: ['stock-branch.component.scss'],
  templateUrl: 'stock-branch.component.html'
})
export class StockBranchComponent {
  @Input()
  parent: FormGroup;
}

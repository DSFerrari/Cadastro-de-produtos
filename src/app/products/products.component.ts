import { Component } from '@angular/core';
import {Product} from './list'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [
  ];
}

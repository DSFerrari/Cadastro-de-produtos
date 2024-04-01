import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import {Product} from './list'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];

  formGroupProduct : FormGroup;

  constructor(private formBuilder:
  FormBuilder, private service: ProductsService){
    this.formGroupProduct =
  formBuilder.group({
    id: [''],
    name: [''],
    describe: [''],
    price: [''],
    quant: ['']
  });
  }
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.service.getProducts().subscribe({
      next: data => this.products = data
    })
  }

  save(){
    this.products.push(this.formGroupProduct.value);
  }
}

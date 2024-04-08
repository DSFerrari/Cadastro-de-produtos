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
  isEditing: boolean = false;

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
    if(this.isEditing){
      this.service.update(this.formGroupProduct.value).subscribe({
        next : () => {
          this.loadProducts();
          this.isEditing = false;
        }
      })
    }
    else{
    this.service.save(this.formGroupProduct.value).subscribe({
      next: data => this.products.push(data)
    });
  }
this.formGroupProduct.reset();
}
  delete(Product:Product){
    this.service.delete(Product).subscribe({
      next: () => this.loadProducts(),});
   }

   edit(Product:Product){
    this.formGroupProduct.setValue(Product);
    this.isEditing = true;
   }
}

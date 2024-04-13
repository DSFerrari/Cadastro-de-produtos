import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import {Product} from './list'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];

  formGroupProduct : FormGroup;
  isEditing: boolean = false;
  submited: boolean = false;

  constructor(private formBuilder:
  FormBuilder, private service: ProductsService){
    this.formGroupProduct =
  formBuilder.group({
    id: [''],
    name: ['',[Validators.minLength(3),Validators.required]],
    describe: ['',[Validators.minLength(2),Validators.required]],
    price: ['',[Validators.min(0.1),Validators.required]],
    quant: ['',[Validators.min(1),Validators.required]]
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
    this.submited = true;
    if (this.formGroupProduct.valid){
    if(this.isEditing){
      this.service.update(this.formGroupProduct.value).subscribe({
        next : () => {
          this.loadProducts();
          this.isEditing = false;
          this.submited = false;
        }
      })
    }
    else{
    this.service.save(this.formGroupProduct.value).subscribe({
      next: data => {this.products.push(data),this.submited = false;}
    });
  }
this.formGroupProduct.reset();
}
  }
  delete(Product:Product){
    this.service.delete(Product).subscribe({
      next: () => this.loadProducts(),});
   }

   edit(Product:Product){
    this.formGroupProduct.setValue(Product);
    this.isEditing = true;
   }
   get name(): any{
    return this.formGroupProduct.get("name");
   }
   get describe(): any{
    return this.formGroupProduct.get("describe");
  }
  get price(): any{
    return this.formGroupProduct.get("price");
  }
  get quant(): any{
    return this.formGroupProduct.get("quant");
  }
  }

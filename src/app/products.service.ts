import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './products/list';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = "http://localhost:3000/Product"
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url);
  }

  save(Product:Product): Observable<Product>{
    return this.http.post<Product>(this.url, Product);
  }
  delete(Product:Product): Observable<void>{
    return this.http.delete<void>
    (`${this.url}/${Product.id}`);
  }
  update(Product:Product): Observable<Product>{
    return this.http.put<Product>
  (`${this.url}/${Product.id}`,Product);
}
}

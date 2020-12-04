import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription; 
  product1: [];
  product2: [];
  cartProducts: any[];
  cartId: string;
  result: any;
  total = 0;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cartSubscription = this.productService.fetchCartItems().subscribe(res=> {
      this.product1 = res[0].products;
      this.product2 = res[0].productObjects;
      this.cartId = res[0]._id.$oid;
      this.cartProducts = [...this.product1.map((p1, i) => Object.assign({}, p1, this.product2[i]))];
      this.productService.genBill(this.cartProducts);
      console.log(this.cartProducts)
    });
    this.productService.total.subscribe(data => {
      this.total = data;
    })
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  onDelete(id: string) {
    const product = {
      product_id: id
    }
    
    this.productService.deleteCartProduct(product);
  }
}

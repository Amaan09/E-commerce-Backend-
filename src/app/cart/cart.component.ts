import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: [{
    product_id: {
      $oid: string
    },
    size: string,
    quantity: number
  }];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.fetchCartItems().subscribe(res=> {
      this.cart = res[0].products;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  deleteCart() {
    this.productService.deleteCartProducts();
  }

}

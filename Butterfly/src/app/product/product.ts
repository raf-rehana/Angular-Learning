import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit {

  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('Product component initialized. Loading products...');
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>('http://localhost:8080/api/products')
      .subscribe(
        (res) => {
          console.log('Successfully loaded products:', res);
          this.products = res;
        },
        (err) => {
          console.error('Error loading products from backend:', err);
        }
      );
  }

  addToCart(product: any) {

    const username = localStorage.getItem('user');

    if (!username) {
      alert('Please login first');
      return;
    }

    this.http.post(
      'http://localhost:8080/api/cart',
      null,
      {
        params: {
          username: username,
          productId: product.id
        },
        responseType: 'text'
      }
    ).subscribe(
      () => {
        alert(product.name + ' added to cart!');
      },
      (err) => {
        console.log(err);
        alert('Failed to add to cart');
      }
    );
  }
}
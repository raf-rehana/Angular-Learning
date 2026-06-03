// product.ts

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit {

  // Search & Filter State
  searchTerm = '';
  selectedCategory = 'All';
  maxPrice = 200;

  // Category list for sidebar
  categoryList = ['All', 'Home & Living', 'Fashion', 'Beauty & Care', 'Electronics'];

  // All products from Spring Boot
  allProducts: any[] = [];

  // Products shown on screen after filtering
  filteredProducts: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadProducts();
  }

  // GET /api/products — load all products from Spring Boot
  loadProducts() {
    this.http.get<any[]>('http://localhost:8080/api/products')
      .subscribe(
        (res) => {
          this.allProducts = res;
          this.filteredProducts = res; // show all by default
        },
        (err) => {
          console.error('Failed to load products', err);
        }
      );
  }

  // Filter products by category, price and search term
  applyFilters() {
    this.filteredProducts = this.allProducts.filter(p => {

      const categoryMatch =
        this.selectedCategory === 'All' ||
        p.category === this.selectedCategory;

      const priceMatch = p.price <= this.maxPrice;

      const searchMatch =
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(this.searchTerm.toLowerCase());

      return categoryMatch && priceMatch && searchMatch;
    });
  }

  // Filter by category button click
  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  // Reset all filters
  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = 'All';
    this.maxPrice = 200;
    this.applyFilters();
  }

  // POST /api/cart — add product to cart in Spring Boot
  addToCart(product: any) {
    const username = localStorage.getItem('user') || '';

    this.http.post(`http://localhost:8080/api/cart?username=${username}&productId=${product.id}`, null, { responseType: 'text' })
      .subscribe(
        (res) => {
          alert(`"${product.name}" added to cart!`);
        },
        (err) => {
          console.error('Failed to add to cart', err);
          alert('Could not add to cart. Please try again.');
        }
      );
  }

}
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public offset = 0;
  public limit = 5;
  public count = 10;
  public users: any[] = [];
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService
      .getUsers({ limit: this.limit, offset: this.offset })
      .subscribe((res) => {
        this.count = res[0];
        this.users = res[1];
      });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onChange(event: any): void {
    this.productService
      .getUsers({ limit: this.limit, offset: this.offset }, event.target.value)
      .subscribe((res) => {
        this.count = res[0];
        this.users = res[1];
      });
  }
  getPaginatorData(event: PageEvent): PageEvent {
    console.log(event);
    this.limit = event.pageSize;
    this.offset = event.pageIndex * event.pageSize;
    this.productService
      .getUsers({ limit: this.limit, offset: this.offset })
      .subscribe((res) => {
        this.count = res[0];
        this.users = res[1];
      });
    return event;
  }
}

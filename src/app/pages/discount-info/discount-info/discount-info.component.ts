import { Component, OnInit } from '@angular/core';
import { IPostResponse } from '../../../interfaces/posts.interface';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrl: './discount-info.component.scss'
})
export class DiscountInfoComponent implements OnInit {
  public discount!: IPostResponse;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOneDiscount();
  }

  getOneDiscount(): void {
    const DISCOUNT_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.postService.getOne(DISCOUNT_ID).subscribe(data => {
      this.discount = data;
    })
  }
}

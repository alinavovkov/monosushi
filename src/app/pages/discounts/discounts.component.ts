import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import {IPost, IPostResponse} from '../../interfaces/posts.interface';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrl: './discounts.component.scss'
})
export class DiscountsComponent implements  OnInit {

  public postBlog: Array<IPostResponse> = [];

  constructor(
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getAllFirebase().subscribe(data => {
      this.postBlog = data as IPost[];
    })
  }
}

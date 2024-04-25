import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs: any;
  imageUrl = "http://localhost:3000"

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      (data)=>{
        console.log(data.posts);
        this.blogs = data.posts;
      },
      (error)=>{
        console.log(error)
      }
    )
  }

}

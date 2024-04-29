import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  private id! : string | null
  public blog : any
  imageUrl = "http://localhost:3000"
  
  constructor(private route: ActivatedRoute,
    private postService: PostService,
    public authService : AuthService,
    private router: Router) {
      
     }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(this.id as string).subscribe(
      (data)=>{
        this.blog = data;
      },
      (error)=> console.log('error : ', error)
    )
  }

  deleteBlog(id: string){
    this.postService.deletePostById(this.blog.id).subscribe(
      (data)=>{
        console.log("Blog deleted")
      },
      (error)=>{
        console.log(error);
      }
    )

    this.router.navigateByUrl("/")
  }
}

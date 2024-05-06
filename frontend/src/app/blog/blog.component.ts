import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../comment.service';
import { Location } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  private id! : string | null
  public blog : any
  imageUrl = "http://localhost:3000"
  editIndex: number = -1;
  commentText: string = "";


  form = new FormGroup({
    text : new FormControl('', Validators.required),
  })

  edit_form = new FormGroup({
    text : new FormControl('', Validators.required),
  })
  
  
  constructor(private route: ActivatedRoute,
    private postService: PostService,
    public authService : AuthService,
    private commentService : CommentService,
    private router: Router,
    private location: Location,
    private changeDetectorRef: ChangeDetectorRef) {
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
        this.router.navigateByUrl("/")
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  createComment() {
    const data = this.form.value;
    const reqData = { ...data, post_id: this.blog.id };
    
    this.commentService.createComment(reqData).subscribe(
      (result) => {
        console.log(result);
        this.location.replaceState(this.location.path());
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteComment(id: string) {
    const commentIndex = this.blog.comments.findIndex((comment: any) => comment.comment_id === id);

    if (commentIndex !== -1) {
        this.commentService.deleteCommentById(id).subscribe(
            () => {
                console.log("Comment deleted successfully");
                this.blog.comments.splice(commentIndex, 1);
            },
            (error) => {
                console.error("Error deleting comment:", error);
            }
        );
    } else {
        console.error("Comment not found for deletion");
    }
}

  

  editComment(id: string){
    const editedText = this.edit_form.value.text;
    const commentIndex = this.blog.comments.findIndex((comment: any) => comment.comment_id === id); 

    if (commentIndex !== -1) {
      this.commentService.updateCommentById(id, { text: editedText }).subscribe(
        (result) => {
          console.log("Comment updated successfully:", result);
          this.editIndex = -1;
          this.blog.comments[commentIndex].comment_text = editedText;
        },
        (error) => {
          console.error("Error updating comment:", error);
          this.editIndex = -1;
        }
      );
    } else {
      console.error("Comment not found for editing");
    }
  }

  toggleEdit(index: number) {
      this.editIndex = index === this.editIndex ? -1 : index;
      this.commentText = this.blog.comments[index].comment_text;
  }
}

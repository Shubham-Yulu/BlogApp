import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  blog = new FormGroup({
    title : new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),

  })

  imageFile!: File;

  constructor(private postService: PostService, private router : Router) { }


  upload(event: any) {
    const file = event.target.files[0];
    this.imageFile = file
  }

  ngOnInit(): void {
  }

  get f(){
    return this.blog.controls;
  }
  
  submitForm = () => {
    if (this.blog.invalid) {
      return;
    }
    
    const formData = new FormData();
    formData.append('title', this.f.title.value);
    formData.append('description', this.f.description.value);
    formData.append('image', this.imageFile);
    formData.append('user_id', "1");

    this.postService.createPost(formData).subscribe(
      (result) => {
        this.router.navigateByUrl("/")
      },
      (error) => {
        this.blog.setErrors({
          loginError : error.error?.message
        })
      }
    ); 
  };
}

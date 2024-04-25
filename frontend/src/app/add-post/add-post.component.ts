import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {


  constructor(private postService: PostService) { }

  blog = new FormGroup({
    title : new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }

  get f(){
    return this.blog.controls;
  }

  onFileChange(event: any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blog.patchValue({
        fileSource: file
      });
    }
  }

  
  submitForm = () => {
    const data = this.blog.value;
    console.log(data);
    const fileSourceControl = this.blog.get('fileSource');
    if (fileSourceControl) {
        const formData = new FormData();
        formData.append('file', fileSourceControl.value);
        this.postService.createPost(data).subscribe(
            (data) => {
                console.log('dataSent');
            },
            (error) => {
                console.log('error');
            }
        );
    }
  };
}

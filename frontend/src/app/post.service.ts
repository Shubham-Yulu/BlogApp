import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = "http://localhost:3000/api/post/"

  constructor(private http : HttpClient) { }

  createPost(data : any){
    return this.http.post<any>(this.url,data);
  }

  getPosts(){
    return this.http.get<any>(this.url)
  }

  getPostById(id : string){
    return this.http.get<any>(this.url + id)
  }

  deletePostById(id: string){
    return this.http.delete<any>(this.url + id)
  }
}

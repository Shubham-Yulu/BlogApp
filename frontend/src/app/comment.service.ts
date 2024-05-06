import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = "http://localhost:3000/api/comment/"

  constructor(private http : HttpClient) { }

  createComment(data : any){
    return this.http.post<any>(this.url, data);
  }

  deleteCommentById(id: string){
    return this.http.delete<any>(this.url + id)
  }

  updateCommentById(id: string, data : any){
    return this.http.patch<any>(this.url + id, data)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export class Movie {
  constructor(
    public id :string,
    public rating: string,
    public image: string,
    public title: string,
    public description: string
    ){}
}


@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {
  movies: Movie[]= [];
  constructor(private http:HttpClient) { }
  async getMovies(name:string){
    let response = await firstValueFrom(this.http.get<any>(`http://www.omdbapi.com/?apikey=6fa2d62e&t=${name}`));
    return response
  }
  postMovie(movie: Movie){
    return this.http.post<any>('http://ptsv2.com/t/p6bt7-1649868318/post', JSON.stringify(movie));
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

import {Movie, ConfigServiceService} from '../config-service.service';
@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.scss']
})
export class TestViewComponent implements OnInit {
  movieRequested = false;
  requestError = false;
  movie = new Movie("", "", "",
  "", "");
  searchBar!:FormGroup;
  constructor(private Config:ConfigServiceService, private formBuilder:FormBuilder) { 
  }

  ngOnInit() {
    this.searchBar = this.formBuilder.group({
      movieName: new FormControl('', [Validators.required])
    })
  }
  async onSubmit(){
    let movieName = this.movieName?.value;
    let response = await this.Config.getMovies(movieName);
    console.log(response);
    if(response.Error){
      this.requestError = true;
      this.movieRequested = false;
      return;
    }
    this.requestError = false;
    this.movieRequested = true;
    this.movie = new Movie(response.imdbID, response.imdbRating, response.Poster,
      response.Title, response.Plot);
    this.Config.postMovie(this.movie).subscribe(
      response => {
        if(response.status != 200){
          console.log('POST call in error', response);
        }
        console.log("weee");
      });
  }
  get movieName() {return this.searchBar.get('movieName');}
}

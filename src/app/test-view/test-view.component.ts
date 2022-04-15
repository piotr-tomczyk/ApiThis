import { Component, OnInit } from '@angular/core';

import {Movie, ConfigServiceService} from '../config-service.service';
@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.scss']
})
export class TestViewComponent implements OnInit {
  movie = new Movie("", "", "",
  "", "");
  constructor(public Config:ConfigServiceService) { 
  }

  async ngOnInit() {
    let response = await this.Config.getMovies("Star wars");
    console.log(response)
    this.movie = new Movie(response.imdbID, response.imdbRating, response.Poster,
      response.Title, response.Plot);
    this.Config.postMovie(this.movie).subscribe(
      response => {
        if(response.status != 200){
          console.log('POST call in error', response);
        }
        console.log("weee");
      });;
  }
}

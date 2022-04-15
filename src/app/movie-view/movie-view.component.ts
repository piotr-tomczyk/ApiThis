import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Movie } from '../config-service.service';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent {

  @Input() movie?: Movie;
  constructor() { }

}

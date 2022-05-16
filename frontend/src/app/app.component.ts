import { ClassService } from './services/class.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  constructor(public classSv:ClassService){

  }
  ngOnInit(): void {
    this.classSv.getClass();
  }
}

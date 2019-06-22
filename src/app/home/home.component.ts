import { Component} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

public appName = environment.appName;

  constructor() { }

}

import { Component} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

public appName = environment.appName;

  constructor() { }

}

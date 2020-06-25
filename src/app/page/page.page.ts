import { Component} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './page.page.html',
  styleUrls: ['./page.page.scss']
})
export class PagePage {

public appName = environment.appName;

  constructor() { }

}

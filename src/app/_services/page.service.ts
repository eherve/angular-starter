import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Page } from '../_classes/page';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ModelMapper } from 'model-mapper';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  static PAGES_KEY = 'PAGES';
  public $pages = new BehaviorSubject<Page[]>([]);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {
    this.init();
  }

  private loadPages(): Observable<Page[]> {
    return this.http.get<any>(`${environment.apiUrl}/pages`)
      .pipe(map(data => data.map(d => new ModelMapper(Page).map(d))));
  }

  private async init() {
    const data = await this.storageService.get(PageService.PAGES_KEY);
    this.$pages.next(data || []);
    this.loadPages().toPromise().then(pages => this.$pages.next(pages));

  }

}

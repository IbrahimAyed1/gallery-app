import { IPhoto, IResponse } from './Photo.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  //Base URL of flicker API

  //#region APIKey
  private _baseUrl =
    'https://www.flickr.com/services/rest/?method=flickr.photos.search';

  get baseUrl(): string {
    return this._baseUrl;
  }
  //#endregion

  private _format = 'json';
  get format(): string {
    return this._format;
  }

  //The Search Text
  private _searchText: string;

  //Getter
  get searchText(): string {
    return this._searchText;
  }

  //Setter
  set searchText(text) {
    if (text) {
      this._searchText = text;
      this.getPhotos();
    } else {
      this._searchText = '';
    }
  }

  private _currentPage: number;
  //Getter
  get currentPage(): number {
    return this._currentPage;
  }

  //Setter
  set currentPage(currPage: number) {
    if (currPage) {
      console.log(this.currentPage);
      console.log(this.searchText);
      this._currentPage = currPage;
    }
    // else {
    //   this._currentPage = 1;
    // }
  }

  //#region Params
  private _params = `api_key=${environment.apiKey}`;
  get params() {
    return this._params;
  }
  set params(params) {
    // this._params = `api_key=${environment.apiKey}&text=${this.searchText}&format=${this._format}&nojsoncallback=1&per_page=10&page=${this.currentPage}`;
    // this._params = params;
  }
  photosArray: IPhoto[] = [];

  //#endregion
  constructor(private http: HttpClient) {}
  getPhotos(): Observable<IPhoto[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('api_key', environment.apiKey);
    if (this.searchText) {
      params = params.append('text', this.searchText);
    } else {
      params = params.append('text', 'world');
    }
    if (this.format) {
      params = params.append('format', this.format);
    }

    params = params.append('nojsoncallback', 1);

    params = params.append('per_page', 15);

    if (this.currentPage) {
      params = params.append('page', this.currentPage);
    } else {
      params = params.append('page', 1);
    }

    console.log(this.params);
    return this.http.get<IResponse>(this.baseUrl, { params: params }).pipe(
      map((resp: IResponse) => {
        return resp.photos.photo;
        // return resp.photos;
      })
    );
  }

  // photos$ = this.http.get<IResponse>(this.baseUrl + this.params).pipe(
  //   map((resp: IResponse) => {
  //     return [...this.photosArray, ...resp.photos.photo];
  //   })
  // );
}

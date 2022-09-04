import { IPhotoUrl } from './../Photo.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../images.service';
import { IPhoto } from '../Photo.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private _imagesService: ImagesService) {}
  photosArray: IPhoto[] = [];
  // photos$: Observable<IPhoto[]> = this._imagesService.photos$;
  ngOnInit(): void {
    this.getPhotos();
    // this.search();
  }
  searchString: string = '';
  search() {
    console.log(this.searchString);
    let pageNumber = 1;
    this._imagesService.searchText = this.searchString;
    this._imagesService.currentPage = pageNumber;
    this.photosMappedURLs = [];
    this.getPhotos();
    // setInterval(() => {
    //   pageNumber++;
    // }, 10000);
  }
  photosMappedURLs: IPhotoUrl[] = [];
  getPhotos() {
    this._imagesService.getPhotos().subscribe(
      (resp: IPhoto[]) => {
        this.photosMappedURLs = [
          ...this.photosMappedURLs,
          ...this.mapPhotos(resp),
        ];
        // console.log(this.photosArray);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  mapPhotos(photos: IPhoto[]): IPhotoUrl[] {
    let photosUrls: IPhotoUrl[] = [];
    photos.forEach((photo) => {
      const photoAsUrl: IPhotoUrl = new IPhotoUrl();
      (photoAsUrl.url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`),
        (photoAsUrl.title = photo.title);
      photosUrls.push(photoAsUrl);
    });
    return photosUrls;
  }
}

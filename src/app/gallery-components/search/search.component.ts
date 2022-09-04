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
  searchString: string = '';
  pageNumber: number = 1;
  photosArray: IPhoto[] = [];

  constructor(private _imagesService: ImagesService) {}
  ngOnInit(): void {
    this.getPhotos();
  }

  search() {
    console.log(this.searchString);
    this._imagesService.searchText = this.searchString;
    this._imagesService.currentPage = this.pageNumber;
    this.photosMappedURLs = [];
    this.getPhotos();
  }
  onScroll() {
    this.pageNumber++;
    this._imagesService.currentPage = this.pageNumber;
    this.getPhotos();
  }
  photosMappedURLs: IPhotoUrl[] = [];
  getPhotos() {
    this._imagesService.getPhotos().subscribe(
      (resp: IPhoto[]) => {
        this.photosMappedURLs = [
          ...this.photosMappedURLs,
          ...this.mapPhotos(resp),
        ];
      },
      (error) => {}
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

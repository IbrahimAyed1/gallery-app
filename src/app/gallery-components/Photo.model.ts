export interface IPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}
export interface IResponse {
  photos: {
    photo: IPhoto[];
  };
}
export class IPhotoUrl {
  url: string = '';
  title: string = '';
}

import {Entity, Column, ManyToOne} from "typeorm";
import { User } from './User';
import { Photo } from './Photo';

@Entity()
export class UserPhoto {

    @ManyToOne(type => User, user => user.userPhotos, { primary: true })
    user: User;

    @ManyToOne(type => Photo, photo => photo.userPhotos, { primary: true })
    photo: Photo;
}

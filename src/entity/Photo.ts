import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {UserPhoto} from './UserPhoto';
import {Face} from './Face';

@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imageUrl: string;

    @Column()
    photoOwner: string;

    @OneToMany(type => UserPhoto, userPhoto => userPhoto.photo)
    userPhotos: UserPhoto[];

    @OneToMany(type => Face, face => face.photoId)
    faces: Face[];
}

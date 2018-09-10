import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Photo} from './Photo';

@Entity()
export class Face {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    topFrame: string;

    @Column()
    rightFrame: string;

    @Column()
    bottomFrame: string;

    @Column()
    leftFrame: string;

    @ManyToOne(type => Photo, photo => photo.faces)
    photo: Photo; 
}

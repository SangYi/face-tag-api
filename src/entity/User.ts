import {Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany} from "typeorm";
import {Auth} from './Auth'
import {UserPhoto} from './UserPhoto';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    username: string;

    @Column({unique: true})
    email: string;

    @Column({type: 'timestamp'})
    created_on: Date;

    @Column({type: 'timestamp'})
    last_login: Date;

    @OneToOne(type => Auth, auth => auth.user)
    auth: Auth;

    @OneToMany(type => UserPhoto, userPhoto => userPhoto.user)
    userPhotos: UserPhoto[];


}

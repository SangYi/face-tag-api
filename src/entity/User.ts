import {Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn} from "typeorm";
import {Login} from './Login';
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

    @OneToOne(type => Login, login => login.user)
    @JoinColumn()
    login: Login;

    @OneToMany(type => UserPhoto, userPhoto => userPhoto.user)
    userPhotos: UserPhoto[];


}

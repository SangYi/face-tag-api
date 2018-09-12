import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm";
import {User} from './User';

@Entity()
export class Auth {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    hash: string;

    @OneToOne(type => User, user => user.auth)
    user: User;
}

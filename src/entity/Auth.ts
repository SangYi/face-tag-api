import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
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
    @JoinColumn()
    user: User;
}

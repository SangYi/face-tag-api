import {getRepository, getConnection} from "typeorm";
import {NextFunction, Request, Response} from "express";
import * as bcrypt from 'bcrypt';
import {Auth} from "../entity/Auth";
import {User} from "../entity/User";

export class AuthController {

    private authRepository = getRepository(Auth);
    private userRepository = getRepository(User);
    
    async handleRegister(req: Request, res: Response, next: NextFunction) {
        const {
            firstName,
            lastName,
            username,
            email,
            password
        } = req.body;
        const usernameCheck = /^[a-zA-Z0-9]*$/i.test(username);
        const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
        
        if (!emailCheck || !usernameCheck || !firstName || !lastName || !password) {
            return res.status(400).json('incorrect form submission');
        }
        const hash = bcrypt.hashSync(password, 10);
        
        await getConnection().transaction(async trxEntityManager => {
            await trxEntityManager.save(trxEntityManager.create(Auth, {
                hash,
                email,
                username
            }));
            const userRes = await trxEntityManager.save(trxEntityManager.create(User, {
                firstName,
                lastName,
                username,
                email,
                created_on: new Date(),
                last_login: new Date()
            }));
            res.json(userRes);            
        })
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err)
        });
    }

    async handleLogin(req: Request, res: Response, next: NextFunction) {
        const { usernameOrEmail, password } = req.body;

        const usernameCheck = /^[a-zA-Z0-9]*$/i.test(usernameOrEmail);
        const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(usernameOrEmail);
        const loginMethod = usernameCheck 
            ? 'username' 
            : emailCheck 
            ? 'email'
            : ''
        if (!loginMethod || !password) {
            return res.status(400).json('incorrect form submission');
        }
        // return this.userRepository.findOne(request.params.id);
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.authRepository.find();
    }

    // async one(request: Request, response: Response, next: NextFunction) {
    //     return this.userRepository.findOne(request.params.id);
    // }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        // await this.userRepository.remove(request.params.id);
        return this.userRepository.remove(request.params.id);
    }

}
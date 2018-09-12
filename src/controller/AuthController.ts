import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import * as bcrypt from 'bcrypt';
import {Auth} from "../entity/Auth";
import {User} from "../entity/User";

export class AuthController {

    private authRepository = getRepository(Auth);
    private userRepository = getRepository(User);
    
    
    async handleRegister(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async handleLogin(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        // await this.userRepository.remove(request.params.id);
        return this.userRepository.remove(request.params.id);
    }

}
import UserService from "../modules/users/service";
import {Request, Response} from "express";
import UserValidator from "../modules/users/validator";
import {commitToUser, IUser} from "../modules/users/model";
import {databaseError, errorResponse, insufficientParameters, successResponse} from "../helpers";

export default class UserController {
    private userService = new UserService();
    private userValidator = new UserValidator();

    public async createUser(req: Request, res: Response) {
        if(this.userValidator.validateCreate(req)) {
            let user: IUser = {email: "", name: ""};
            commitToUser(user, req.body);
            try {
                const createdUser = await this.userService.createUser(user);
                successResponse('Creating user was successful.', createdUser, res);
            } catch(err) {
                databaseError(err, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    public async getUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getUsers();
            successResponse('Retrieved users successfully.', users, res);
        } catch(err) {
            databaseError(err, res);
        }
    }

    public async getUser(req: Request, res: Response) {
        if(this.userValidator.validateGetUser(req)) {
            try {
                const userQuery = { _id: req.params.id };
                let user = await this.userService.filterUser(userQuery);
                if(user) {
                    successResponse('Retrieving user was successful.', user, res);
                } else {
                    errorResponse('User was not found.', res);
                }
            } catch(err) {
                databaseError(err, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    public async updateUser(req: Request, res: Response) {
        if(this.userValidator.validateUpdateUser(req)) {
            try {
                const userQuery = { _id: req.params.id };
                let user = await this.userService.filterUser(userQuery);
                if(user) {
                    let castedUser = user as unknown as IUser;
                    commitToUser(castedUser, req.body);
                    try {
                        let updatedUser = await this.userService.updateUser(castedUser);
                        successResponse('Updating user was successful.', updatedUser, res);
                    } catch(err) {
                        databaseError(err, res);
                    }
                } else {
                    errorResponse('User was not found.', res);
                }
            } catch(err) {
                databaseError(err, res);
            }
        } else {
            insufficientParameters(res);
        }
    }
}

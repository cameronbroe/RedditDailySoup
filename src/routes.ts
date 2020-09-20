import * as express from 'express';
import UserController from "./controllers/userController";

const userController = new UserController();

export default function routes(app: express.Application) {
    app.get('/user', async (req, res) => {
        await userController.getUsers(req, res);
    });
    app.get('/user/:id', async (req, res) => {
        await userController.getUser(req, res);
    });
    app.post('/user', async (req, res) => {
        console.log('creating a new user');
        await userController.createUser(req, res);
    });
    app.put('/user/:id', async (req, res) => {
        await userController.updateUser(req, res);
    });
}

import { IUser } from './model';
import Users from './schema';

export default class UserService {
    public async getUsers() {
        return Users.find({});
    }

    public async createUser(params: IUser) {
        const _session = new Users(params);
        return _session.save();
    }

    public async filterUser(query: any) {
        return Users.findOne(query);
    }

    public async filterUsers(query: any) {
        return Users.find(query);
    }

    public async updateUser(params: IUser) {
        const query = { _id: params._id };
        return Users.findOneAndUpdate(query, params);
    }

    public async deleteUser(_id: String) {
        const query = { _id };
        return Users.deleteOne(query);
    }
}

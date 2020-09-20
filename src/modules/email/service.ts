import {IUser} from "../users/model";
import {SubredditData} from "../reddit/service";
import * as util from 'util';

export default class EmailService {
    public async sendEmailToUser(user: IUser, data: SubredditData[]) {
        // This is where calling out the email service would actually happen.
        // But for the purposes of demonstration, this will just log out to the console!
        const emailServiceRequest = {
            email: user.email,
            name: user.name,
            subredditSummaries: data
        }
        console.log(util.inspect(emailServiceRequest, { depth: null }));
    }
}

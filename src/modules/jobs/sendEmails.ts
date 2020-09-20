import UserService from "../users/service";
import {IUser} from "../users/model";
import {RedditService} from "../reddit/service";
import * as _ from 'lodash';
import EmailService from "../email/service";

export default async function sendEmails() {
    console.log('Sending emails out to users');
    let userService = new UserService();
    let redditService = new RedditService();
    let emailService = new EmailService();
    let currentTime = new Date();
    let userQuery = {
        sendTime: {
            hour: currentTime.getUTCHours(),
            minute: currentTime.getUTCMinutes()
        },
        emailsEnabled: true
    }

    try {
        let users = await userService.filterUsers(userQuery);
        for(let user of users) {
            let castedUser = user as unknown as IUser;
            let subredditSummaries = await Promise.all(_.map(castedUser.favoriteSubreddits, (subreddit) => {
                return redditService.getTopPostsFromSubreddit(subreddit);
            }));
            await emailService.sendEmailToUser(castedUser, subredditSummaries);
        }
    } catch(err) {
        console.error(err);
    }
}

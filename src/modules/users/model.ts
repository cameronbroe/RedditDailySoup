export interface ISendTime {
    hour: Number;
    minute: Number;
}

export interface IUser {
    _id?: String;
    name: String;
    email: String;
    sendTime?: ISendTime;
    emailsEnabled?: Boolean;
    favoriteSubreddits?: [String];
}

export function commitToUser(user: IUser, data: any) {
    user.name = data.name !== undefined ? data.name : user.name;
    user.email = data.email !== undefined ? data.email : user.email;
    user.sendTime = data.sendTime !== undefined ? data.sendTime : user.sendTime;
    user.emailsEnabled = data.emailsEnabled !== undefined ? data.emailsEnabled : user.emailsEnabled;
    user.favoriteSubreddits = data.favoriteSubreddits !== undefined ? data.favoriteSubreddits : user.favoriteSubreddits;
}

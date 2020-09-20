import {Request} from "express";
import {ISendTime} from "./model";

export default class UserValidator {
    private __validateSendTime(sendTime: ISendTime): Boolean {
        return sendTime.hour <= 23 && sendTime.minute <= 59;
    }

    public validateCreate(req: Request): Boolean {
        // If a send_time is specified, make sure it is valid.
        if(!!req.body.sendTime && !this.__validateSendTime(req.body.sendTime)) {
            return false;
        }
        // Always check if there is at least a name and email in the request
        return (req.body.name && req.body.email);
    }

    public validateGetUser(req: Request): Boolean {
        return !!req.params.id;
    }

    public validateUpdateUser(req: Request): Boolean {
        // If a send_time is specified, make sure it is valid.
        if(!!req.body.sendTime && !this.__validateSendTime(req.body.sendTime)) {
            return false;
        }
        return !!req.params.id;
    }
}

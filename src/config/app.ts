import express from 'express';
import routes from "../routes";
import mongoose from "mongoose";
import {Job, scheduleJob} from "node-schedule";
import sendEmails from "../modules/jobs/sendEmails";

class App {
    public app: express.Application;
    public mongoUrl: string = 'mongodb://mongo/redditdailysoup'
    public emailJob: Job;

    constructor() {
        this.app = express();
        this.emailJob = scheduleJob('* * * * *', sendEmails);
        this.configure();
        this.mongoSetup();
        routes(this.app);
    }

    private configure() {
        this.app.use(express.json());
    }

    private mongoSetup() {
        console.log('Setting up MongoDB connection');
        mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        mongoose.set('returnOriginal', false);
    }
}

export default new App().app;

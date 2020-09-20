import superagent from 'superagent';
import * as _ from 'lodash';
import {AllHtmlEntities} from "html-entities";

interface SubredditPost {
    title: String;
    score: Number;
    thumbnailUrl?: String;
}

export interface SubredditData {
    topLink: String;
    displayName: String;
    posts: SubredditPost[];
}

export class RedditService {
    public async getTopPostsFromSubreddit(subreddit: String): Promise<SubredditData> {
        const entities = new AllHtmlEntities();

        const subredditInfoUrl = `https://reddit.com/r/${subreddit}/about.json`;
        const subredditInfoResponse = await superagent.get(subredditInfoUrl);

        const subredditPostsUrl = `https://reddit.com/r/${subreddit}/top.json`;
        const subredditPostsResponse = await superagent.get(subredditPostsUrl);
        const posts: SubredditPost[] = _.map(subredditPostsResponse.body.data.children, (post) => {
            return {
                title: post.data.title,
                score: post.data.score,
                thumbnailUrl: !!post.data.preview ? entities.decode(post.data.preview.images[0].source.url) : undefined
            }
        });
        return {
            displayName: subredditInfoResponse.body.data.display_name,
            topLink: `https://reddit.com/r/${subreddit}/top`,
            posts: _.take(posts, 3)
        };
    }
}

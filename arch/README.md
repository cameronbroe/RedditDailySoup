# Service Descriptions

* User Management Service
  * Handles user creation and deletion
  * Handles tracking what delivery methods user wants newsletter delivered by
  * Handles updating user's subscribed subreddits
  
* Subscription Cron Service
  * Runs jobs every minute to get users that should receive a newsletter
  * Gets subreddit data from Reddit API
  * Calls out to User Management Service to get user data
  * Calls out to Newsletter Rendering Service to get HTML for a user's newsletter
  * Forwards rendered HTML to email and Slack delivery services to deliver newsletters
  
* Newsletter Rendering Service
  * Takes requests with subreddit data and returns HTML for the rendered newsletter
  
* Delivery Services
  * Email delivery service handles sending emails
  * Slack delivery service handles sending Slack messages

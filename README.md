# RedditDailySoup

This is an implementation of a service for sending out daily newsletters with summaries of folks' favorite subreddits.

The service will call out to the Reddit API at the specific send time for a user and get the top 3 posts for each of a
user's favorite subreddits. It will take the information for those 3 posts and submit a request to an email service to
actually send the email.

There are many things to be done for this to be production ready, so don't actually deploy this anywhere. :D

# Standing up the service

This repository is designed to be ran with Docker Compose and is completely self-contained. The only dependency 
is to make sure you have Docker Desktop installed on your machine.

Getting the service up and running is as simple as running the following command:

`docker-compose up`

The API then should be exposed at `localhost:3000`.

# Documentation

Detailed API documentation is hosted on GitHub Pages at https://cameronbroe.github.io/RedditDailySoup/

# Scheduled Jobs

For the actual email sends, the service has an in-process cron-like scheduler that runs a function every minute.
This function queries the database for users that should have an email sent at the current time in relation to UTC.
It then queries Reddit's API to get the list of top posts for each of the user's favorite subreddits. After it collects
all of this information, it sends out a request to the email service to actually render and send out the email.


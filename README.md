# Hacker News Front Page using GraphQL

In this project, I make use of Ruan Martinelli's Hacker News Graphql API.

## Steps
- Click [here](https://github.com/ruanmartinelli/hacker-news-graphql-api) to download the API server. Follow the instructions in the README file to get it running.

- In the hacker-news-graphql-api folder, in the function `fetchTopStories` located in `schema.js` replace the line of code: ` .then(ids => ids.slice(0, 3))`  with ` .then(ids => ids.slice(0, 31))`. This is to ensure the API returns 30 top stories and not only 2 stories(the default).

-  Step into this repo's directory
    `cd hacker-news-with-graphql`

- Start up a server with [Python](https://www.python.org/)
    `python -m SimpleHTTP Server`

- Open the port on your browser

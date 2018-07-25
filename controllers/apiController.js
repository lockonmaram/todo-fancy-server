var OAuth = require('oauth');
var oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      process.env.APP_CONSUMER_KEY,
      process.env.APP_SECRET_KEY,
      '1.0A',
      null,
      'HMAC-SHA1'
    );
require('dotenv').config()

class ApiController {
  static getOauth(req, res){
    oauth.get(
      'https://api.twitter.com/1.1/trends/place.json?id=23424977',
      process.env.APP_CONSUMER_KEY,
      process.env.APP_SECRET_KEY,
      function (e, data, response){
        if (e) console.error(e);
        console.log(require('util').inspect(data));
        res.status(200).json(JSON.parse(data))
      }
    );
  }
  static getTimeline(req, res){
    oauth.get(
      'https://api.twitter.com/1.1/statuses/home_timeline.json',
      process.env.USER_APP_TOKEN,
      process.env.USER_SECRET_KEY,
      function (e, data, response){
        if (e) console.error(e);
        console.log(require('util').inspect(data));
        res.status(200).json(JSON.parse(data))
      }
    );
  }
  static searchTweet(req, res){
    oauth.get(
      `https://api.twitter.com/1.1/search/tweets.json?q=${req.body.search}`,
      process.env.USER_APP_TOKEN,
      process.env.USER_SECRET_KEY,
      function (e, data, response){
        if (e) console.error(e);
        console.log(require('util').inspect(data));
        res.status(200).json(JSON.parse(data))
      }
    );
  }
  static tweet(req, res){
    console.log(req.body.todo);
    let message
    let priority
    if (req.body.todo.priority === 'low') {
      priority = 'someday'
    }else if (req.body.todo.priority === 'medium') {
      priority = 'in a minute'
    }else if (req.body.todo.priority === 'high') {
      priority = 'as soon as possible'
    }
    if (req.body.todo.done === 'false') {
      message = `I will do a task: ${req.body.todo.task}, ${priority}`
    }else if (req.body.todo.done === 'true') {
      message = `I have done the task: ${req.body.todo.task}`
    }
    console.log(message);
    oauth.post(
      `https://api.twitter.com/1.1/statuses/update.json`,
      process.env.USER_APP_TOKEN,
      process.env.USER_SECRET_KEY,
      {
        status: message
      },
      function (e, data, response){
        if (e) console.error(e);
        console.log(require('util').inspect(data));
        res.status(200).json(JSON.parse(data))
      }
    );
  }
}

module.exports = ApiController

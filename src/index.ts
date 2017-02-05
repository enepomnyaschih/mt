import Tweet from './data/Tweet';
import TweetView from './tweetview/TweetView';

require('./reset.css');

const data = require<any>('./data.json');
let tweet: Tweet;
let tweetView: TweetView;

$(function() {
	tweet = Tweet.createByJson(data);
	tweetView = new TweetView(tweet);
	tweetView.renderTo('body');
});
